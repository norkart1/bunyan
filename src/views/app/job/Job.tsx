import DownloadButton from '../../../components/dynamic/DownloadButton'
import Table from '../../../components/dynamic/Table'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { ColumnDef, ColumnSort, Row } from '@tanstack/react-table'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { FaPlusCircle } from 'react-icons/fa'
import { TbChecks, TbEye, TbPencil, TbSearch, TbTrash } from 'react-icons/tb'
import CreateModal from '@/components/dynamic/CreateModal'
import { FaImage } from 'react-icons/fa6'
import UpdateModal from '@/components/dynamic/UpdateModal'
import DeleteModal from '@/components/dynamic/DeleteModal'
import { EmploymentTypeEnum, Job, LocationTypeEnum, RoleEnum } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_JOBS,
    FIND_ALL_JOBS,
} from '@/graphql/queries/job'
import {
    CREATE_JOB,
    DELETE_JOB,
    DELETE_JOBS,
    UPDATE_JOB,
} from '@/graphql/mutations/job'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { useSessionUser } from '@/store/authStore'
import { cloudinaryUpload } from '@/utils/cloudinaryUpload'
import { Tag } from '@/components/ui'

export default function Jobs() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const user = useSessionUser((state) => state.user)

    const [formValues, setFormValues] = useState<Record<string, any>>({})
    const [jobCount, setJobCount] = useState(0);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState({
        findAll: false,
        count: false,
        create: false,
        update: false,
        delete: false,
        deleteMany: false
    });
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [search, setSearch] = useState('');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false);
    const [toView, setToView] = useState<Job | null>(null);
    const [toUpdate, setToUpdate] = useState<Job | null>(null);
    const [toDelete, setToDelete] = useState<Job | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_JOBS, {
        variables: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            orderBy: sorting.length > 0 ? { field: sorting[0].id, direction: sorting[0].desc ? 'desc' : 'asc' } : {},
            relationsToFilter: {},
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
        },
    });

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_JOBS, {
        variables: {
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setJobs(findAllData.jobs);
        }
        if (countData) {
            setJobCount(countData.countJob);
        }
        if (findAllError || countError) {
            setErrorMessage(findAllError?.message || countError?.message || 'An unknown error occurred.');
        }
        setLoading((prev) => ({
            ...prev,
            findAll: findAllLoading,
            count: countLoading,
        }));
    }, [findAllData, countData, findAllError, countError, findAllLoading, countLoading]);

    useEffect(() => {
        if (jobCount === 0) return;
        const totalPages = Math.ceil(jobCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, jobCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => jobs[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Job>[]>(() => {
        return [
            {
                header: 'Title',
                accessorKey: 'title',
                enableSorting: true,
            },
            {
                header: 'Employment Type',
                accessorKey: 'employmentType',
                enableSorting: true
            },
            {
                header: 'Location Type',
                accessorKey: 'locationType',
                enableSorting: true
            },
            {
                header: 'Salary Range',
                accessorKey: 'salaryRange',
                enableSorting: true
            },
            {
                header: 'Expiration Date',
                accessorKey: 'startingDate',
                enableSorting: true,
                cell: ({ row }) => convertToYYYYMMDD(row.original.expirationDate)
            },
            {
                header: 'Location',
                accessorKey: 'location',
                enableSorting: true,
                cell: ({ row }) => row.original.location || 'N/A'
            },
            {
                header: 'Active',
                accessorKey: 'active',
                enableSorting: true,
                cell: ({ row }) => (
                    <Tag className={row.original.active ? 'bg-green-400' : 'bg-red-400'}>
                        {row.original.active ? 'Active' : 'Inactive'}
                    </Tag>
                )
            }
        ]
    }, [])

    const updateStateAfterRefetch = async () => {
        const { data: updatedFindAllData } = await refetchFindAll();
        const { data: updatedCountData } = await refetchCount();
        if (updatedFindAllData) {
            setJobs(updatedFindAllData.jobs);
        }
        if (updatedCountData) {
            setJobCount(updatedCountData.countJob);
            const totalPages = Math.ceil(updatedCountData.countJob / pageSize);
            const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
            setPageIndex(adjustedPageIndex >= 0 ? adjustedPageIndex : 0);
        }
    };

    const createInputs = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'Enter Job Title',
            width: 'w-full',
            required: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter Job Description',
            width: 'w-full',
            required: true,
        },
        {
            name: 'employmentType',
            label: 'Employment Type',
            type: 'select',
            placeholder: 'Select Employment Type',
            width: 'w-full',
            required: true,
            options: [
                { label: EmploymentTypeEnum.FullTime.toString(), value: EmploymentTypeEnum.FullTime },
                { label: EmploymentTypeEnum.PartTime.toString(), value: EmploymentTypeEnum.PartTime },
                { label: EmploymentTypeEnum.Contract.toString(), value: EmploymentTypeEnum.Contract },
                { label: EmploymentTypeEnum.Intern.toString(), value: EmploymentTypeEnum.Intern },
                { label: EmploymentTypeEnum.Temporary.toString(), value: EmploymentTypeEnum.Temporary }
            ]
        },
        {
            name: 'locationType',
            label: 'Location Type',
            type: 'select',
            placeholder: 'Select Location Type',
            width: 'w-full',
            required: true,
            options: [
                { label: LocationTypeEnum.Onsite.toString(), value: LocationTypeEnum.Onsite },
                { label: LocationTypeEnum.Remote.toString(), value: LocationTypeEnum.Remote },
                { label: LocationTypeEnum.Hybrid.toString(), value: LocationTypeEnum.Hybrid }
            ]
        },
        {
            name: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'Enter Job Location',
            width: 'w-full',
            required: formValues['locationType']?.value !== LocationTypeEnum.Remote,
            disabled: formValues['locationType']?.value === LocationTypeEnum.Remote
        },
        {
            name: 'salaryRange',
            label: 'Salary Range',
            type: 'text',
            placeholder: 'Enter Job Salary Range',
            width: 'w-full',
            required: true
        },
        {
            name: 'skills',
            label: 'Skills',
            type: 'text',
            placeholder: 'Enter Job Skills [separated by comma]',
            width: 'w-full',
            required: true
        },
        {
            name: 'expirationDate',
            label: 'Expiration Date',
            type: 'date',
            placeholder: 'Enter Job Expiration Date',
            width: 'w-full',
            required: true
        },
        {
            name: 'active',
            label: 'Active',
            type: 'switcher',
            width: 'w-full',
            required: true
        }

    ]

    const [createJob] = useMutation(CREATE_JOB, {
        refetchQueries: [{ query: FIND_ALL_JOBS }, { query: COUNT_JOBS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Job created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create job';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    async function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })

        const payload: any = {
            title: formData.title,
            description: formData.description,
            employmentType: formData.employmentType.value,
            locationType: formData.locationType.value,
            salaryRange: formData.salaryRange,
            skills: formData.skills,
            expirationDate: formData.expirationDate,
            admin: user?.role === RoleEnum.SuperAdmin,
            active: formData.active,
        }
        if (user?.role === RoleEnum.MahalluAdmin) {
            payload.mahalluId = user?.mahalluId
        }
        if (formData.locationType.value !== LocationTypeEnum.Remote) {
            payload.location = formData.location
        }

        createJob({
            variables: {
                createJobInput: payload
            }
        }).finally(() => setLoading({ ...loading, create: false }))
    }

    const updateInputs = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'Enter Job Title',
            width: 'w-full',
            required: true,
            value: toUpdate?.title
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter Job Description',
            width: 'w-full',
            required: true,
            value: toUpdate?.description
        },
        {
            name: 'employmentType',
            label: 'Employment Type',
            type: 'select',
            placeholder: 'Select Employment Type',
            width: 'w-full',
            required: true,
            options: [
                { label: EmploymentTypeEnum.FullTime.toString(), value: EmploymentTypeEnum.FullTime },
                { label: EmploymentTypeEnum.PartTime.toString(), value: EmploymentTypeEnum.PartTime },
                { label: EmploymentTypeEnum.Contract.toString(), value: EmploymentTypeEnum.Contract },
                { label: EmploymentTypeEnum.Intern.toString(), value: EmploymentTypeEnum.Intern },
                { label: EmploymentTypeEnum.Temporary.toString(), value: EmploymentTypeEnum.Temporary }
            ],
            value: {
                label: toUpdate?.employmentType?.toString(),
                value: toUpdate?.employmentType
            }
        },
        {
            name: 'locationType',
            label: 'Location Type',
            type: 'select',
            placeholder: 'Select Location Type',
            width: 'w-full',
            required: true,
            options: [
                { label: LocationTypeEnum.Onsite.toString(), value: LocationTypeEnum.Onsite },
                { label: LocationTypeEnum.Remote.toString(), value: LocationTypeEnum.Remote },
                { label: LocationTypeEnum.Hybrid.toString(), value: LocationTypeEnum.Hybrid }
            ],
            value: {
                label: toUpdate?.locationType?.toString(),
                value: toUpdate?.locationType
            }
        },
        {
            name: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'Enter Job Location',
            width: 'w-full',
            value: toUpdate?.location,
            required: formValues['locationType']?.value !== LocationTypeEnum.Remote,
            disabled: formValues['locationType']?.value === LocationTypeEnum.Remote
        },
        {
            name: 'salaryRange',
            label: 'Salary Range',
            type: 'text',
            placeholder: 'Enter Job Salary Range',
            width: 'w-full',
            value: toUpdate?.salaryRange
        },
        {
            name: 'skills',
            label: 'Skills',
            type: 'text',
            placeholder: 'Enter Job Skills [separated by comma]',
            width: 'w-full',
            value: toUpdate?.skills
        },
        {
            name: 'expirationDate',
            label: 'Expiration Date',
            type: 'date',
            placeholder: 'Enter Job Expiration Date',
            width: 'w-full',
            required: true,
            value: toUpdate?.expirationDate
        },
        {
            name: 'active',
            label: 'Active',
            type: 'switcher',
            width: 'w-full',
            required: true,
            value: toUpdate?.active
        }
    ]

    const [updateJob] = useMutation(UPDATE_JOB, {
        refetchQueries: [{ query: FIND_ALL_JOBS }, { query: COUNT_JOBS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Job updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update job';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    async function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })

        const payload: any = {
            id: toUpdate?.id,
            title: formData.title,
            description: formData.description,
            employmentType: formData.employmentType.value,
            locationType: formData.locationType.value,
            salaryRange: formData.salaryRange,
            skills: formData.skills,
            expirationDate: formData.expirationDate,
            admin: user?.role === RoleEnum.SuperAdmin,
            active: formData.active,
        }
        if (user?.role === RoleEnum.MahalluAdmin) {
            payload.mahalluId = user?.mahalluId
        }
        if (formData.locationType.value !== LocationTypeEnum.Remote) {
            payload.location = formData.location
        }
        if (formData.locationType.value === LocationTypeEnum.Remote) {
            payload.location = ''
        }

        updateJob({
            variables: {
                updateJobInput: payload
            }
        }).finally(() => setLoading({ ...loading, update: false }))
    }

    const [deleteJob] = useMutation(DELETE_JOB, {
        refetchQueries: [{ query: FIND_ALL_JOBS }, { query: COUNT_JOBS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Job deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete job';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteJob({
            variables: {
                removeJobId: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteJobs] = useMutation(DELETE_JOBS, {
        refetchQueries: [{ query: FIND_ALL_JOBS }, { query: COUNT_JOBS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Jobs deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({});
            setIsDeleteManyOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete jobs';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteJobs({
            variables: {
                removeJobIds: ids,
            },
        }).finally(() => setLoading({ ...loading, deleteMany: false }))
    }

    return (
        <>
            {isViewOpen && toView && (
                <ViewModal
                    isOpen={isViewOpen}
                    setIsOpen={setIsViewOpen}
                    title="Job Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Title:</span>
                                <span>{toView.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Description:</span>
                                <span>{toView.description}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Employment Type:</span>
                                <span>{toView.employmentType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Location Type:</span>
                                <span>{toView.locationType}</span>
                            </div>
                            {
                                toView.locationType !== LocationTypeEnum.Remote && (
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Location:</span>
                                        <span>{toView.location}</span>
                                    </div>
                                )
                            }
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Salary Range:</span>
                                <span>{toView.salaryRange}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Skills:</span>
                                <span>{toView.skills}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Expiration Date:</span>
                                <span>{convertToYYYYMMDD(toView.expirationDate)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Active:</span>
                                <Tag className={toView.active ? 'bg-green-400' : 'bg-red-400'}>
                                    {toView.active ? 'Active' : 'Inactive'}
                                </Tag>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Created At:</span>
                                <span>{convertToYYYYMMDD(toView.createdAt)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Updated At:</span>
                                <span>{convertToYYYYMMDD(toView.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </ViewModal>
            )}
            {isCreateOpen && (
                <CreateModal
                    formValues={formValues}
                    setFormValues={setFormValues}
                    isOpen={isCreateOpen}
                    setIsOpen={setIsCreateOpen}
                    title="Create Job"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Job"
                    inputs={updateInputs}
                    updateItem={handleUpdate}
                    updateLoading={loading.update}
                    formValues={formValues}
                    setFormValues={setFormValues}
                />
            )}
            {isDeleteOpen && toDelete && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    setIsOpen={setIsDeleteOpen}
                    title="Delete Job"
                    description={`Are you sure you want to delete ${toDelete?.title} job?, 
                    This action cannot be undone.`}
                    toDeleteId={toDelete?.id || 0}
                    deleteItem={handleDelete}
                    deleteLoading={loading.delete}
                />
            )}
            {isDeleteManyOpen && (
                <DeleteModal
                    isOpen={isDeleteManyOpen}
                    setIsOpen={setIsDeleteManyOpen}
                    title="Delete Jobs"
                    description={`Are you sure you want to delete selected jobs?, 
                    This action cannot be undone.`}
                    toDeleteIds={Object.keys(rowSelection).map((key) => jobs[Number(key)]?.id)}
                    deleteItems={handleDeleteMany}
                    deleteLoading={loading.deleteMany}
                />
            )}
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Jobs</h3>
                            <div className="flex gap-2">
                                <DownloadButton data={jobs} />
                                <Button
                                    variant="solid"
                                    className="flex items-center"
                                    onClick={() => {
                                        setIsCreateOpen(true)
                                        setFormValues({
                                            ...formValues,
                                            active: false
                                        })
                                    }}
                                >
                                    <FaPlusCircle className="mr-1" />
                                    Add New
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <DebouceInput
                                placeholder="Search"
                                suffix={<TbSearch className="text-lg" />}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Table
                            selection={true}
                            name="job"
                            data={jobs}
                            dataCount={jobCount}
                            findAllLoading={loading.findAll}
                            countLoading={loading.count}
                            extraColumns={extraColumns}
                            rowSelection={rowSelection}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            setRowSelection={setRowSelection}
                            sorting={sorting}
                            setSorting={setSorting}
                            deleteMany={handleDeleteMany}
                            actionButtons={(row: Row<Job>) => (
                                <div className="flex items-center gap-3">
                                    <Tooltip title="View">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToView(row.original)
                                                setIsViewOpen(true)
                                            }}
                                        >
                                            <TbEye />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToUpdate(row.original)
                                                setIsUpdateOpen(true)
                                            }}
                                        >
                                            <TbPencil />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToDelete(row.original)
                                                setIsDeleteOpen(true)
                                            }}
                                        >
                                            <TbTrash />
                                        </div>
                                    </Tooltip>
                                </div>
                            )}
                        />
                    </div>
                </AdaptiveCard>
                {Object.keys(rowSelection).length > 0 &&
                    <StickyFooter
                        className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                        stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                        defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4 w-full"
                    >
                        <div className="container mx-auto">
                            <div className="flex items-center justify-between">
                                <span>
                                    {Object.keys(rowSelection).length > 0 && (
                                        <span className="flex items-center gap-2">
                                            <span className="text-lg text-primary">
                                                <TbChecks />
                                            </span>
                                            <span className="font-semibold flex items-center gap-1">
                                                <span className="heading-text">
                                                    {Object.keys(rowSelection).length}{' '}
                                                    {Object.keys(rowSelection).length > 1 ? 'job' + 's' : 'job'}
                                                </span>
                                                <span>selected</span>
                                            </span>
                                        </span>
                                    )}
                                </span>

                                <div className="flex items-center">

                                    <Button
                                        size="sm"
                                        className='mr-3 button bg-white border dark:bg-gray-700 dark:border-gray-700 dark:ring-white dark:hover:border-white hover:ring-1 dark:hover:text-white dark:hover:bg-transparent dark:text-gray-100 h-10 rounded-xl px-3 py-2 text-sm button-press-feedback border-gray-400 ring-1 ring-gray-400 text-gray-500 hover:border-gray-500 hover:ring-gray-500 hover:text-gray-500'
                                        onClick={() =>
                                            setRowSelection({})
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                        }
                                        onClick={() => setIsDeleteManyOpen(true)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </StickyFooter>
                }
            </Container>
        </>
    )
}
