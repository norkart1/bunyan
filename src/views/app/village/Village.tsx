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
import { Zone, Village, RoleEnum } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_VILLAGES,
    FIND_ALL_VILLAGES,
} from '@/graphql/queries/village'
import {
    CREATE_VILLAGE,
    DELETE_VILLAGE,
    DELETE_VILLAGES,
    UPDATE_VILLAGE,
} from '@/graphql/mutations/village'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { FIND_ALL_ZONES } from '@/graphql/queries/zone'
import { useSessionUser } from '@/store/authStore'

export default function Villages() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const user = useSessionUser((state) => state.user)

    const [formValues, setFormValues] = useState<Record<string, any>>({})
    const [villageCount, setVillageCount] = useState(0);
    const [villages, setVillages] = useState<Village[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
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
    const [toView, setToView] = useState<Village | null>(null);
    const [toUpdate, setToUpdate] = useState<Village | null>(null);
    const [toDelete, setToDelete] = useState<Village | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_VILLAGES, {
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

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_VILLAGES, {
        variables: {
            filters: {
                name: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setVillages(findAllData.villages);
        }
        if (countData) {
            setVillageCount(countData.countVillage);
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
        if (villageCount === 0) return;
        const totalPages = Math.ceil(villageCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, villageCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => villages[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Village>[]>(() => {
        const columns: ColumnDef<Village>[] = [
            {
                header: 'Name',
                accessorKey: 'name',
                enableSorting: true,
            },
            {
                header: 'District',
                accessorKey: 'district',
                enableSorting: true,
                cell: ({ row }) => row.original.zone?.district?.name
            },
            {
                header: 'Zone',
                accessorKey: 'zone',
                enableSorting: true,
                cell: ({ row }) => row.original.zone?.name,
            },
            {
                header: 'User Name',
                accessorKey: 'credential',
                enableSorting: false,
                cell: ({ row }) => row.original.credential?.username,
            },
        ]

        if (user?.role === RoleEnum.SuperAdmin) {
            return columns
        } else {
            return columns.filter(column => column.header !== 'Zone' && column.header !== 'District')
        }
    }, [])

    const updateStateAfterRefetch = async () => {
        const { data: updatedFindAllData } = await refetchFindAll();
        const { data: updatedCountData } = await refetchCount();
        if (updatedFindAllData) {
            setVillages(updatedFindAllData.villages);
        }
        if (updatedCountData) {
            setVillageCount(updatedCountData.countVillage);
            const totalPages = Math.ceil(updatedCountData.countVillage / pageSize);
            const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
            setPageIndex(adjustedPageIndex >= 0 ? adjustedPageIndex : 0);
        }
    };

    const createInputs = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Village Name',
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
        }
    ]

    const [createVillage] = useMutation(CREATE_VILLAGE, {
        refetchQueries: [{ query: FIND_ALL_VILLAGES }, { query: COUNT_VILLAGES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Village created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create village';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })
        createVillage({
            variables: {
                createVillageInput: {
                    name: formData.name,
                    zoneId: user?.zoneId,
                    username: formData.userName,
                    password: formData.password
                },
            },
        }).finally(() => setLoading({ ...loading, create: false }))
    }

    const updateInputs = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter Village Name',
            width: 'w-1/2',
            required: true,
            value: toUpdate?.name,
        },
    ]

    const [updateVillage] = useMutation(UPDATE_VILLAGE, {
        refetchQueries: [{ query: FIND_ALL_VILLAGES }, { query: COUNT_VILLAGES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Village updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update village';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })
        updateVillage({
            variables: {
                updateVillageInput: {
                    id: toUpdate?.id,
                    name: formData.name,
                    zoneId: user?.zoneId,
                },
            },
        }).finally(() => setLoading({ ...loading, update: false }))
    }

    const [deleteVillage] = useMutation(DELETE_VILLAGE, {
        refetchQueries: [{ query: FIND_ALL_VILLAGES }, { query: COUNT_VILLAGES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Village deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete village';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteVillage({
            variables: {
                id: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteVillages] = useMutation(DELETE_VILLAGES, {
        refetchQueries: [{ query: FIND_ALL_VILLAGES }, { query: COUNT_VILLAGES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Villages deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({});
            setIsDeleteManyOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete villages';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteVillages({
            variables: {
                ids: ids,
            },
        }).finally(() => setLoading({ ...loading, deleteMany: false }))
    }

    return (
        <>
            {isViewOpen && toView && (
                <ViewModal
                    isOpen={isViewOpen}
                    setIsOpen={setIsViewOpen}
                    title="Village Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
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
                                            <span className="font-semibold">Zone:</span>
                                            <span>{toView.zone?.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">District:</span>
                                            <span>{toView.zone?.district?.name}</span>
                                        </div>
                                    </>
                                )
                            }
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
                    title="Create Village"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Village"
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
                    title="Delete Village"
                    description={`Are you sure you want to delete ${toDelete?.name} village?, 
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
                    title="Delete Villages"
                    description={`Are you sure you want to delete selected villages?, 
                    This action cannot be undone.`}
                    toDeleteIds={Object.keys(rowSelection).map((key) => villages[Number(key)]?.id)}
                    deleteItems={handleDeleteMany}
                    deleteLoading={loading.deleteMany}
                />
            )}
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Villages</h3>
                            <div className="flex gap-2">
                                {/* <DownloadButton data={zones} /> */}
                                {
                                    user?.role === RoleEnum.ZoneAdmin && (
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
                            selection={user?.role === RoleEnum.ZoneAdmin}
                            name="village"
                            data={villages}
                            dataCount={villageCount}
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
                            actionButtons={(row: Row<Village>) => (
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
                                        user?.role === RoleEnum.ZoneAdmin && (
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
                                                    {Object.keys(rowSelection).length > 1 ? 'village' + 's' : 'village'}
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
