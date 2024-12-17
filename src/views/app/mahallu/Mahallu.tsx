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
import { Village, Mahallu, Zone, District, RoleEnum } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_MAHALLUS,
    FIND_ALL_MAHALLUS,
} from '@/graphql/queries/mahallu'
import {
    CREATE_MAHALLU,
    DELETE_MAHALLU,
    DELETE_MAHALLUS,
    UPDATE_MAHALLU,
} from '@/graphql/mutations/mahallu'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { FIND_ALL_VILLAGES } from '@/graphql/queries/village'
import { Tag } from '@/components/ui'
import { FIND_ALL_ZONES } from '@/graphql/queries/zone'
import { FIND_ALL_DISTRICTS } from '@/graphql/queries/district'
import { useSessionUser } from '@/store/authStore'

export default function Mahallus() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const user = useSessionUser((state) => state.user)

    const [formValues, setFormValues] = useState<Record<string, any>>({})
    const [mahalluCount, setMahalluCount] = useState(0);
    const [mahallus, setMahallus] = useState<Mahallu[]>([]);
    const [villages, setVillages] = useState<Village[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [filteredZones, setFilteredZones] = useState<Zone[]>([])
    const [filteredVillages, setFilteredVillages] = useState<Village[]>([])
    const [loading, setLoading] = useState({
        findAll: false,
        count: false,
        create: false,
        update: false,
        delete: false,
        deleteMany: false,
    });
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [search, setSearch] = useState('');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false);
    const [toView, setToView] = useState<Mahallu | null>(null);
    const [toUpdate, setToUpdate] = useState<Mahallu | null>(null);
    const [toDelete, setToDelete] = useState<Mahallu | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_MAHALLUS, {
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

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_MAHALLUS, {
        variables: {
            filters: {
                name: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setMahallus(findAllData.mahallus);
        }
        if (countData) {
            setMahalluCount(countData.countMahallu);
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
        if (mahalluCount === 0) return;
        const totalPages = Math.ceil(mahalluCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, mahalluCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => mahallus[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Mahallu>[]>(() => {
        const columns: ColumnDef<Mahallu>[] = [
            {
                header: 'Reg No',
                accessorKey: 'regNo',
                enableSorting: true,
            },
            {
                header: 'Name',
                accessorKey: 'name',
                enableSorting: true,
            },
            {
                header: 'District',
                accessorKey: 'district',
                enableSorting: true,
                cell: ({ row }) => row.original.village?.zone?.district?.name,
            },
            {
                header: 'Zone',
                accessorKey: 'zone',
                enableSorting: true,
                cell: ({ row }) => row.original.village?.zone?.name,
            },
            {
                header: 'Village',
                accessorKey: 'village',
                enableSorting: true,
                cell: ({ row }) => row.original.village?.name,
            },
            {
                header: 'User Name',
                accessorKey: 'credential',
                enableSorting: false,
                cell: ({ row }) => row.original.credential?.username,
            },
            {
                header: 'Contact',
                accessorKey: 'contact',
                enableSorting: false,
            },
        ]
        if (user?.role === RoleEnum.SuperAdmin) {
            return columns
        } else {
            return columns.filter(column => column.header !== 'District' && column.header !== 'Zone' && column.header !== 'Village')
        }
    }, [])

    const updateStateAfterRefetch = async () => {
        const { data: updatedFindAllData } = await refetchFindAll();
        const { data: updatedCountData } = await refetchCount();
        if (updatedFindAllData) {
            setMahallus(updatedFindAllData.mahallus);
        }
        if (updatedCountData) {
            setMahalluCount(updatedCountData.countMahallu);
            const totalPages = Math.ceil(updatedCountData.countMahallu / pageSize);
            const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
            setPageIndex(adjustedPageIndex >= 0 ? adjustedPageIndex : 0);
        }
    };

    const createInputs = [
        {
            name: 'regNo',
            label: 'Registration No',
            type: 'text',
            required: true,
            placeholder: 'Enter Registration No',
            width: 'w-full',
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Mahallu Name',
            width: 'w-full',
        },
        {
            name: 'userName',
            label: 'User Name',
            type: 'text',
            required: true,
            placeholder: 'Enter User Name',
            width: 'w-full'
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            required: true,
            placeholder: 'Enter Password',
            width: 'w-full'
        },
        {
            name: 'contact',
            label: 'Contact',
            type: 'text',
            required: true,
            placeholder: 'Enter Contact',
            width: 'w-full'
        },
        {
            name: 'place',
            label: 'Place',
            type: 'text',
            required: true,
            placeholder: 'Enter Place',
            width: 'w-full'
        },
        {
            name: 'pinCode',
            label: 'Pin Code',
            type: 'text',
            required: true,
            placeholder: 'Enter Pin Code',
            width: 'w-full'
        },
        {
            name: 'postOffice',
            label: 'Post Office',
            type: 'text',
            required: true,
            placeholder: 'Enter Post Office',
            width: 'w-full'
        },
    ]

    const [createMahallu] = useMutation(CREATE_MAHALLU, {
        refetchQueries: [{ query: FIND_ALL_MAHALLUS }, { query: COUNT_MAHALLUS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Mahallu created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create mahallu';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })
        createMahallu({
            variables: {
                createMahalluInput: {
                    name: formData.name,
                    villageId: user?.villageId,
                    username: formData.userName,
                    password: formData.password,
                    regNo: formData.regNo,
                    contact: formData.contact,
                    place: formData.place,
                    pinCode: formData.pinCode,
                    postOffice: formData.postOffice,
                },
            },
        }).finally(() => setLoading({ ...loading, create: false }))
    }

    const updateInputs = [
        {
            name: 'regNo',
            label: 'Registration No',
            type: 'text',
            required: true,
            placeholder: 'Enter Registration No',
            width: 'w-full',
            value: toUpdate?.regNo,
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Mahallu Name',
            width: 'w-full',
            value: toUpdate?.name,
        },
        {
            name: 'contact',
            label: 'Contact',
            type: 'text',
            required: true,
            placeholder: 'Enter Contact',
            width: 'w-full',
            value: toUpdate?.contact,
        },
        {
            name: 'place',
            label: 'Place',
            type: 'text',
            required: true,
            placeholder: 'Enter Place',
            width: 'w-full',
            value: toUpdate?.place,
        },
        {
            name: 'pinCode',
            label: 'Pin Code',
            type: 'text',
            required: true,
            placeholder: 'Enter Pin Code',
            width: 'w-full',
            value: toUpdate?.pinCode
        },
        {
            name: 'postOffice',
            label: 'Post Office',
            type: 'text',
            required: true,
            placeholder: 'Enter Post Office',
            width: 'w-full',
            value: toUpdate?.postOffice
        },
    ]

    const [updateMahallu] = useMutation(UPDATE_MAHALLU, {
        refetchQueries: [{ query: FIND_ALL_MAHALLUS }, { query: COUNT_MAHALLUS }],
        awaitRefetchQueries: true, // Ensures refetch completes before moving on
        onCompleted: (data) => {
            toast.success('Mahallu updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false); // Close modal
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update mahallu';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });


    function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })
        updateMahallu({
            variables: {
                updateMahalluInput: {
                    id: toUpdate?.id,
                    name: formData.name,
                    villageId: user?.villageId,
                    regNo: formData.regNo,
                    contact: formData.contact,
                    place: formData.place,
                    pinCode: formData.pinCode,
                    postOffice: formData.postOffice,
                },
            },
        }).finally(() => setLoading({ ...loading, update: false }))
    }

    const [deleteMahallu] = useMutation(DELETE_MAHALLU, {
        refetchQueries: [{ query: FIND_ALL_MAHALLUS }, { query: COUNT_MAHALLUS }],
        awaitRefetchQueries: true, // Ensures refetch completes before moving on
        onCompleted: (data) => {
            toast.success('Mahallu deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false); // Close modal
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete mahallu';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteMahallu({
            variables: {
                removeMahalluId: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteMahallus] = useMutation(DELETE_MAHALLUS, {
        refetchQueries: [{ query: FIND_ALL_MAHALLUS }, { query: COUNT_MAHALLUS }],
        awaitRefetchQueries: true, // Ensures refetch completes before moving on
        onCompleted: (data) => {
            toast.success('Mahallus deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({}); // Clear row selection
            setIsDeleteManyOpen(false); // Close modal
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete mahallus';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteMahallus({
            variables: {
                removeMahalluIds: ids,
            },
        }).finally(() => setLoading({ ...loading, deleteMany: false }))
    }

    return (
        <>
            {isViewOpen && toView && (
                <ViewModal
                    isOpen={isViewOpen}
                    setIsOpen={setIsViewOpen}
                    title="Mahallu Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Reg No:</span>
                                <span>{toView.regNo}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Name:</span>
                                <span>{toView.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">User Name:</span>
                                <span>{toView.credential?.username}</span>
                            </div>
                            {
                                user?.role === RoleEnum.SuperAdmin && (
                                    <>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">District:</span>
                                            <span>{toView.village?.zone?.district?.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">Zone:</span>
                                            <span>{toView.village?.zone?.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">Village:</span>
                                            <span>{toView.village?.name}</span>
                                        </div>
                                    </>
                                )
                            }
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Contact:</span>
                                <span>{toView.contact}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Place:</span>
                                <span>{toView.place}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Pin Code:</span>
                                <span>{toView.pinCode}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Post Office:</span>
                                <span>{toView.postOffice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Created At:
                                </span>
                                <span>{convertToYYYYMMDD(toView.createdAt)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Updated At:
                                </span>
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
                    title="Create Mahallu"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Mahallu"
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
                    title="Delete Mahallu"
                    description={`Are you sure you want to delete ${toDelete?.name} mahallu?, 
                    This action cannot be undone.`}
                    toDeleteId={toDelete?.id || 0}
                    deleteItem={handleDelete}
                    deleteLoading={loading.delete}
                />
            )}

            {
                isDeleteManyOpen && (
                    <DeleteModal
                        isOpen={isDeleteManyOpen}
                        setIsOpen={setIsDeleteManyOpen}
                        title="Delete Mahallus"
                        description={`Are you sure you want to delete selected mahallus?, 
                        This action cannot be undone.`}
                        toDeleteIds={Object.keys(rowSelection).map((key) => mahallus[Number(key)]?.id)}
                        deleteItems={handleDeleteMany}
                        deleteLoading={loading.deleteMany}
                    />
                )
            }
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Mahallus</h3>
                            <div className="flex gap-2">
                                {/* <DownloadButton data={zones} /> */}
                                {
                                    user?.role === RoleEnum.VillageAdmin && (
                                        <Button
                                            variant="solid"
                                            className="flex items-center"
                                            onClick={() => setIsCreateOpen(true)}
                                        >
                                            <FaPlusCircle className="mr-1" />
                                            Add New
                                        </Button>
                                    )
                                }
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
                            selection={user?.role === RoleEnum.VillageAdmin}
                            name="mahallu"
                            data={mahallus}
                            dataCount={mahalluCount}
                            findAllLoading={loading.findAll || loading.count}
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
                            actionButtons={(row: Row<Mahallu>) => (
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
                                    {
                                        user?.role === RoleEnum.VillageAdmin && (
                                            <>
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
                                            </>
                                        )
                                    }
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
                                                    {Object.keys(rowSelection).length > 1 ? 'mahallu' + 's' : 'mahallu'}
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
