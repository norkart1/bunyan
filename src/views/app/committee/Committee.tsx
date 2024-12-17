import DownloadButton from '../../../components/dynamic/DownloadButton'
import Table from '../../../components/dynamic/Table'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnDef, ColumnSort, Row } from '@tanstack/react-table'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { FaPlusCircle } from 'react-icons/fa'
import { TbChecks, TbEye, TbPencil, TbSearch, TbTrash } from 'react-icons/tb'
import CreateModal from '@/components/dynamic/CreateModal'
import { FaImage } from 'react-icons/fa6'
import UpdateModal from '@/components/dynamic/UpdateModal'
import DeleteModal from '@/components/dynamic/DeleteModal'
import { Member, Committee } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_COMMITTEES,
    FIND_ALL_COMMITTEES,
} from '@/graphql/queries/committee'
import {
    CREATE_COMMITTEE,
    DELETE_COMMITTEE,
    DELETE_COMMITTEES,
    UPDATE_COMMITTEE,
} from '@/graphql/mutations/committee'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { FIND_ALL_MEMBERS } from '@/graphql/queries/member'
import { useSessionUser } from '@/store/authStore'
import { debounce } from 'lodash'

export default function Committees() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [formValues, setFormValues] = useState<Record<string, any>>({})

    const user = useSessionUser((state) => state.user)

    const [committeeCount, setCommitteeCount] = useState(0);
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState({
        findAll: false,
        count: false,
        create: false,
        update: false,
        delete: false,
        deleteMany: false,
        allMembers: false,
    });
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [search, setSearch] = useState('');
    const [selectSearch, setSelectSearch] = useState('');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false);
    const [toView, setToView] = useState<Committee | null>(null);
    const [toUpdate, setToUpdate] = useState<Committee | null>(null);
    const [toDelete, setToDelete] = useState<Committee | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_COMMITTEES, {
        variables: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            orderBy: sorting.length > 0 ? { field: sorting[0].id, direction: sorting[0].desc ? 'desc' : 'asc' } : {},
            relationsToFilter: {},
            filters: {
                position: { contains: search, mode: 'insensitive' },
            },
        },
    });

    const { data: allMembersData, error: allMembersError, loading: allMembersLoading } = useQuery(FIND_ALL_MEMBERS, {
        variables: {
            limit: 2,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {
                name: { contains: selectSearch, mode: 'insensitive' },
                family: {
                    mahalluId: user?.mahalluId
                }
            },
        },
    });

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_COMMITTEES, {
        variables: {
            filters: {
                position: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setCommittees(findAllData.committees);
        }
        if (countData) {
            setCommitteeCount(countData.countCommittee);
        }
        if (allMembersData) {
            setMembers(allMembersData.members)
        }
        if (findAllError || countError || allMembersError) {
            setErrorMessage(findAllError?.message || countError?.message || allMembersError?.message || 'An unknown error occurred.');
        }
        setLoading((prev) => ({
            ...prev,
            findAll: findAllLoading,
            count: countLoading,
            allMembers: allMembersLoading,
        }));
    }, [findAllData, countData, allMembersData, findAllError, countError, allMembersError, findAllLoading, countLoading, allMembersLoading]);

    useEffect(() => {
        if (committeeCount === 0) return;
        const totalPages = Math.ceil(committeeCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, committeeCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => committees[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Committee>[]>(() => {
        return [
            {
                header: 'Name',
                accessorKey: 'name',
                enableSorting: true,
                cell: ({ row }) => row.original.member?.name,
            },
            {
                header: 'Position',
                accessorKey: 'position',
                enableSorting: true,
            }
        ]
    }, [])

    const updateStateAfterRefetch = async () => {
        const { data: updatedFindAllData } = await refetchFindAll();
        const { data: updatedCountData } = await refetchCount();
        if (updatedFindAllData) {
            setCommittees(updatedFindAllData.committees);
        }
        if (updatedCountData) {
            setCommitteeCount(updatedCountData.countCommittee);
            const totalPages = Math.ceil(updatedCountData.countCommittee / pageSize);
            if (pageIndex >= totalPages) {
                setPageIndex(totalPages - 1);
            }
        }
    };

    const createInputs = [
        {
            name: 'position',
            label: 'Position',
            type: 'text',
            required: true,
            placeholder: 'Enter Committee Position',
            width: 'w-full',
        },
        {
            name: 'memberId',
            label: 'Member',
            type: 'select',
            required: true,
            placeholder: 'Select Member',
            width: 'w-full',
            options: [
                ...members.map((member) => ({
                    label: member.name,
                    value: member.id,
                })),
            ],
            selectInputChange: useCallback(
                debounce((newValue: string) => {
                    setSelectSearch(newValue);
                }, 300),
                []
            ),
            selectLoading: allMembersLoading,
        }
    ]

    const [createCommittee] = useMutation(CREATE_COMMITTEE, {
        refetchQueries: [{ query: FIND_ALL_COMMITTEES }, { query: COUNT_COMMITTEES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Committee created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create committee';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })
        createCommittee({
            variables: {
                createCommitteeInput: {
                    position: formData.position,
                    memberId: formData.memberId.value,
                    mahalluId: user?.mahalluId,
                },
            },
        }).finally(() => setLoading({ ...loading, create: false }))
    }

    const updateInputs = [
        {
            name: 'position',
            label: 'Position',
            type: 'text',
            required: true,
            placeholder: 'Enter Committee Position',
            width: 'w-full',
            value: toUpdate?.position,
        },
        {
            name: 'memberId',
            label: 'Member',
            type: 'select',
            required: true,
            placeholder: 'Select Member',
            width: 'w-full',
            options: [
                ...members.map((member) => ({
                    label: member.name,
                    value: member.id,
                })),
            ],
            value: {
                label: toUpdate?.member?.name,
                value: toUpdate?.memberId,
            },
            selectInputChange: useCallback(
                debounce((newValue: string) => {
                    setSelectSearch(newValue);
                }, 300),
                []
            ),
            selectLoading: allMembersLoading,
        }
    ]

    const [updateCommittee] = useMutation(UPDATE_COMMITTEE, {
        refetchQueries: [{ query: FIND_ALL_COMMITTEES }, { query: COUNT_COMMITTEES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Committee updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update committee';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })
        updateCommittee({
            variables: {
                updateCommitteeInput: {
                    id: toUpdate?.id,
                    position: formData.position,
                    memberId: formData.memberId.value,
                    mahalluId: user?.mahalluId,
                },
            },
        }).finally(() => setLoading({ ...loading, update: false }))
    }

    const [deleteCommittee] = useMutation(DELETE_COMMITTEE, {
        refetchQueries: [{ query: FIND_ALL_COMMITTEES }, { query: COUNT_COMMITTEES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Committee deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete committee';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteCommittee({
            variables: {
                removeCommitteeId: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteCommittees] = useMutation(DELETE_COMMITTEES, {
        refetchQueries: [{ query: FIND_ALL_COMMITTEES }, { query: COUNT_COMMITTEES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Committees deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({});
            setIsDeleteManyOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete committees';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteCommittees({
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
                    title="Committee Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Position:</span>
                                <span>{toView.position}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Member:</span>
                                <span>{toView.member?.name}</span>
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
                    title="Create Committee"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Committee"
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
                    title="Delete Committee"
                    description={`Are you sure you want to delete ${toDelete?.member?.name} committee?, 
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
                    title="Delete Committees"
                    description={`Are you sure you want to delete selected committees?, 
                    This action cannot be undone.`}
                    toDeleteIds={Object.keys(rowSelection).map((key) => committees[Number(key)]?.id)}
                    deleteItems={handleDeleteMany}
                    deleteLoading={loading.deleteMany}
                />
            )}
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Committees</h3>
                            <div className="flex gap-2">
                                <DownloadButton data={committees} />
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
                            name="committee"
                            data={committees}
                            dataCount={committeeCount}
                            findAllLoading={loading.findAll || loading.count || loading.allMembers}
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
                            actionButtons={(row: Row<Committee>) => (
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
                                                    {Object.keys(rowSelection).length > 1 ? 'committee' + 's' : 'committee'}
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
