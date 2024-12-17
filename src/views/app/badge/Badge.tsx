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
import { Year, Badge } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_BADGES,
    FIND_ALL_BADGES,
} from '@/graphql/queries/badge'
import {
    CREATE_BADGE,
    DELETE_BADGE,
    DELETE_BADGES,
    UPDATE_BADGE,
} from '@/graphql/mutations/badge'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { FIND_ALL_YEARS } from '@/graphql/queries/year'
import { cloudinaryUpload } from '@/utils/cloudinaryUpload'

export default function Badges() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [formValues, setFormValues] = useState<Record<string, any>>({})
    const [badgeCount, setBadgeCount] = useState(0);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [years, setYears] = useState<Year[]>([]);
    const [loading, setLoading] = useState({
        findAll: false,
        count: false,
        create: false,
        update: false,
        delete: false,
        deleteMany: false,
        allYears: false,
    });
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [search, setSearch] = useState('');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false);
    const [toView, setToView] = useState<Badge | null>(null);
    const [toUpdate, setToUpdate] = useState<Badge | null>(null);
    const [toDelete, setToDelete] = useState<Badge | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_BADGES, {
        variables: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            orderBy: sorting.length > 0 ? { field: sorting[0].id, direction: sorting[0].desc ? 'desc' : 'asc' } : {},
            relationsToFilter: {},
            filters: {
                name: { contains: search, mode: 'insensitive' },
            },
        },
    });

    const { data: allYearsData, error: allYearsError, loading: allYearsLoading } = useQuery(FIND_ALL_YEARS, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {},
        },
    });

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_BADGES, {
        variables: {
            filters: {
                name: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setBadges(findAllData.badges);
        }
        if (countData) {
            setBadgeCount(countData.countBadge);
        }
        if (allYearsData) {
            setYears(allYearsData.years)
        }
        if (findAllError || countError || allYearsError) {
            setErrorMessage(findAllError?.message || countError?.message || allYearsError?.message || 'An unknown error occurred.');
        }
        setLoading((prev) => ({
            ...prev,
            findAll: findAllLoading,
            count: countLoading,
            allYears: allYearsLoading,
        }));
    }, [findAllData, countData, allYearsData, findAllError, countError, allYearsError, findAllLoading, countLoading, allYearsLoading]);

    useEffect(() => {
        if (badgeCount === 0) return;
        const totalPages = Math.ceil(badgeCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, badgeCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => badges[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Badge>[]>(() => {
        return [
            {
                header: 'Name',
                accessorKey: 'name',
                enableSorting: true,
            },
            {
                header: 'Icon',
                accessorKey: 'icon',
                enableSorting: false,
                cell: ({ row }) => (
                    <img
                        src={row.original.icon as string}
                        alt={row.original.name as string}
                        className="w-10 h-10 rounded-lg"
                    />
                )
            },
            {
                header: 'Year',
                accessorKey: 'year',
                enableSorting: true,
                cell: ({ row }) => row.original.year?.name,
            },
        ]
    }, [])

    const updateStateAfterRefetch = async () => {
        const { data: updatedFindAllData } = await refetchFindAll();
        const { data: updatedCountData } = await refetchCount();
        if (updatedFindAllData) {
            setBadges(updatedFindAllData.badges);
        }
        if (updatedCountData) {
            setBadgeCount(updatedCountData.countBadge);
            const totalPages = Math.ceil(updatedCountData.countBadge / pageSize);
            if (pageIndex >= totalPages) {
                setPageIndex(totalPages - 1);
            }
        }
    };

    const createInputs = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Badge Name',
            width: 'w-full',
        },
        {
            name: 'icon',
            label: 'Icon',
            type: 'file',
            required: true,
            placeholder: 'Select Icon',
            width: 'w-full',
        },
        {
            name: 'yearId',
            label: 'Year',
            type: 'select',
            required: true,
            placeholder: 'Select Year',
            width: 'w-full',
            options: [
                ...years.map((year) => ({
                    label: year.name,
                    value: year.id,
                })),
            ]
        },
    ]

    const [createBadge] = useMutation(CREATE_BADGE, {
        refetchQueries: [{ query: FIND_ALL_BADGES }, { query: COUNT_BADGES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Badge created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create badge';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    async function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })

        await cloudinaryUpload(formData.icon[0]).then((url) => {

            createBadge({
                variables: {
                    createBadgeInput: {
                        name: formData.name,
                        icon: url,
                        yearId: formData.yearId.value,
                    },
                },
            }).finally(() => setLoading({ ...loading, create: false }))

        }).catch((error) => {
            toast.error('Failed to upload image', { id: 'toastId', duration: 5000 });
            setLoading({ ...loading, create: false })
        })
    }

    const updateInputs = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Badge Name',
            width: 'w-full',
            value: toUpdate?.name,
        },
        {
            name: 'icon',
            label: 'Icon',
            type: 'file',
            placeholder: 'Select Icon',
            width: 'w-full',
        },
        {
            name: 'yearId',
            label: 'Year',
            type: 'select',
            required: true,
            placeholder: 'Select Year',
            width: 'w-full',
            options: [
                ...years.map((year) => ({
                    label: year.name,
                    value: year.id,
                })),
            ],
            value: {
                label: toUpdate?.year?.name,
                value: toUpdate?.year?.id,
            },
        },
    ]

    const [updateBadge] = useMutation(UPDATE_BADGE, {
        refetchQueries: [{ query: FIND_ALL_BADGES }, { query: COUNT_BADGES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Badge updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update badge';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    async function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })

        if (formData.icon) {
            await cloudinaryUpload(formData.icon[0]).then((url) => {
                updateBadge({
                    variables: {
                        updateBadgeInput: {
                            id: toUpdate?.id,
                            name: formData.name,
                            icon: url,
                            yearId: formData.yearId.value,
                        },
                    },
                }).finally(() => setLoading({ ...loading, update: false }))
            }).catch((error) => {
                toast.error('Failed to upload image', { id: 'toastId', duration: 5000 });
                setLoading({ ...loading, update: false })
            })
        } else {
            updateBadge({
                variables: {
                    updateBadgeInput: {
                        id: toUpdate?.id,
                        name: formData.name,
                        icon: toUpdate?.icon,
                        yearId: formData.yearId.value,
                    },
                },
            }).finally(() => setLoading({ ...loading, update: false }))
        }
    }

    const [deleteBadge] = useMutation(DELETE_BADGE, {
        refetchQueries: [{ query: FIND_ALL_BADGES }, { query: COUNT_BADGES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Badge deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete badge';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteBadge({
            variables: {
                removeBadgeId: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteBadges] = useMutation(DELETE_BADGES, {
        refetchQueries: [{ query: FIND_ALL_BADGES }, { query: COUNT_BADGES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Badges deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({});
            setIsDeleteManyOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete badges';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteBadges({
            variables: {
                removeBadgeIds: ids,
            },
        }).finally(() => setLoading({ ...loading, deleteMany: false }))
    }

    return (
        <>
            {isViewOpen && toView && (
                <ViewModal
                    isOpen={isViewOpen}
                    setIsOpen={setIsViewOpen}
                    title="Badge Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Name:</span>
                                <span>{toView.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Icon:</span>
                                <img
                                    src={toView.icon as string}
                                    alt={toView.name as string}
                                    className="w-10 h-10 rounded-lg"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Year:</span>
                                <span>{toView.year?.name}</span>
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
                    title="Create Badge"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Badge"
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
                    title="Delete Badge"
                    description={`Are you sure you want to delete ${toDelete?.name} badge?, 
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
                    title="Delete Badges"
                    description={`Are you sure you want to delete selected badges?, 
                    This action cannot be undone.`}
                    toDeleteIds={Object.keys(rowSelection).map((key) => badges[Number(key)]?.id)}
                    deleteItems={handleDeleteMany}
                    deleteLoading={loading.deleteMany}
                />
            )}
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Badges</h3>
                            <div className="flex gap-2">
                                <DownloadButton data={badges} />
                                <Button
                                    variant="solid"
                                    className="flex items-center"
                                    onClick={() => setIsCreateOpen(true)}
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
                            name="badge"
                            data={badges}
                            dataCount={badgeCount}
                            findAllLoading={loading.findAll || loading.count || loading.allYears}
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
                            actionButtons={(row: Row<Badge>) => (
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
                                                    {Object.keys(rowSelection).length > 1 ? 'badge' + 's' : 'badge'}
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
