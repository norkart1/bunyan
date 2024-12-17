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
import { Badge, Campaign, Task, TaskCategory, Year } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_TASKS,
    FIND_ALL_TASKS,
} from '@/graphql/queries/task'
import {
    CREATE_TASK,
    DELETE_TASK,
    DELETE_TASKS,
    UPDATE_TASK,
} from '@/graphql/mutations/task'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { FIND_ALL_BADGES } from '@/graphql/queries/badge'
import { FIND_ALL_YEARS } from '@/graphql/queries/year'
import { Tag } from '@/components/ui'
import { FIND_ALL_TASK_CATEGORIES } from '@/graphql/queries/task-category'
import { FIND_ALL_CAMPAIGNS } from '@/graphql/queries/campaign'

export default function Tasks() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [formValues, setFormValues] = useState<Record<string, any>>({})
    const [taskCount, setTaskCount] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [years, setYears] = useState<Year[]>([]);
    const [categories, setCategories] = useState<TaskCategory[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState({
        findAll: false,
        count: false,
        create: false,
        update: false,
        delete: false,
        deleteMany: false,
        allBadges: false,
        allYears: false,
        allCategories: false,
        allCampaigns: false,
    });
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [search, setSearch] = useState('');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false);
    const [toView, setToView] = useState<Task | null>(null);
    const [toUpdate, setToUpdate] = useState<Task | null>(null);
    const [toDelete, setToDelete] = useState<Task | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_TASKS, {
        variables: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            orderBy: sorting.length > 0 ? { field: sorting[0].id, direction: sorting[0].desc ? 'desc' : 'asc' } : {},
            relationsToFilter: {},
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
        },
        fetchPolicy: 'no-cache',
    });

    const { data: allBadgesData, error: allBadgesError, loading: allBadgesLoading } = useQuery(FIND_ALL_BADGES, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {},
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
    })

    const { data: allCategoriesData, error: allCategoriesError, loading: allCategoriesLoading } = useQuery(FIND_ALL_TASK_CATEGORIES, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {},
        }
    })

    const { data: allCampaignsData, error: allCampaignsError, loading: allCampaignsLoading } = useQuery(FIND_ALL_CAMPAIGNS, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {},
        },
    })

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_TASKS, {
        variables: {
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
        fetchPolicy: 'no-cache',
    });

    useEffect(() => {
        if (findAllData) {
            setTasks(findAllData.tasks);
        }
        if (countData) {
            setTaskCount(countData.countTask);
        }
        if (allBadgesData) {
            setBadges(allBadgesData.badges)
        }
        if (allYearsData) {
            setYears(allYearsData.years)
        }
        if (allCategoriesData) {
            setCategories(allCategoriesData.taskCategories)
        }
        if (allCampaignsData) {
            setCampaigns(allCampaignsData.campaigns)
        }
        if (findAllError || countError || allBadgesError || allYearsError || allCategoriesError || allCampaignsError) {
            setErrorMessage(findAllError?.message || countError?.message || allBadgesError?.message || allYearsError?.message || allCampaignsError?.message || allCategoriesError?.message || 'An unknown error occurred.');
        }
        setLoading((prev) => ({
            ...prev,
            findAll: findAllLoading,
            count: countLoading,
            allBadges: allBadgesLoading,
            allYears: allYearsLoading,
            allCategories: allCategoriesLoading,
            allCampaigns: allCampaignsLoading,
        }));
    }, [findAllData, countData, allBadgesData, findAllError, countError, allBadgesError, findAllLoading, countLoading, allBadgesLoading, allYearsData, allYearsError, allYearsLoading, allCategoriesData, allCategoriesError, allCategoriesLoading, allCampaignsData, allCampaignsError, allCampaignsLoading]);

    useEffect(() => {
        if (taskCount === 0) return;
        const totalPages = Math.ceil(taskCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, taskCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => tasks[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Task>[]>(() => {
        return [
            {
                header: 'Title',
                accessorKey: 'title',
                enableSorting: true,
            },
            {
                header: 'Year',
                accessorKey: 'year',
                enableSorting: true,
                cell: ({ row }) => row.original.year?.name
            },
            {
                header: 'Badge',
                accessorKey: 'badge',
                enableSorting: true,
                cell: ({ row }) => row.original.badge?.name
            },
            {
                header: 'Category',
                accessorKey: 'category',
                enableSorting: true,
                cell: ({ row }) => row.original.category?.title
            },
            {
                header: 'Campaign',
                accessorKey: 'campaign',
                enableSorting: true,
                cell: ({ row }) => row.original.campaign?.title
            },
            {
                header: 'Points',
                accessorKey: 'points',
                enableSorting: true,
            },
            {
                header: 'Start Date',
                accessorKey: 'startDate',
                enableSorting: true,
                cell: ({ row }) => convertToYYYYMMDD(row.original.startDate)
            },
            {
                header: 'Due Date',
                accessorKey: 'dueDate',
                enableSorting: true,
                cell: ({ row }) => convertToYYYYMMDD(row.original.dueDate)
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
            setTasks(updatedFindAllData.tasks);
        }
        if (updatedCountData) {
            setTaskCount(updatedCountData.countTask);
            const totalPages = Math.ceil(updatedCountData.countTask / pageSize);
            const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
            setPageIndex(adjustedPageIndex >= 0 ? adjustedPageIndex : 0);
        }
    };

    const createInputs = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            placeholder: 'Enter Task Title',
            width: 'w-full'
        },
        {
            name: 'description',
            label: 'Description',
            type: 'rte',
            required: true,
            placeholder: 'Enter Task Description',
            width: 'w-full'
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
                    value: year.id
                }))
            ]
        },
        {
            name: 'badgeId',
            label: 'Badge',
            type: 'select',
            placeholder: 'Select Badge',
            width: 'w-full',
            options: [
                ...badges.map((badge) => ({
                    label: badge.name,
                    value: badge.id
                }))
            ]
        },
        {
            name: 'categoryId',
            label: 'Category',
            type: 'select',
            required: true,
            placeholder: 'Select Category',
            width: 'w-full',
            options: [
                ...categories.map((category) => ({
                    label: category.title,
                    value: category.id
                }))
            ]
        },
        {
            name: 'campaignId',
            label: 'Campaign',
            type: 'select',
            placeholder: 'Select Campaign',
            width: 'w-full',
            options: [
                ...campaigns.map((campaign) => ({
                    label: campaign.title,
                    value: campaign.id
                }))
            ]
        },
        {
            name: 'points',
            label: 'Points',
            type: 'number',
            required: true,
            placeholder: 'Enter Task Points',
            width: 'w-full'
        },
        {
            name: 'startDate',
            label: 'Start Date',
            type: 'date',
            required: true,
            placeholder: 'Select Start Date',
            width: 'w-full'
        },
        {
            name: 'dueDate',
            label: 'Due Date',
            type: 'date',
            required: true,
            placeholder: 'Select Due Date',
            width: 'w-full'
        },
        {
            name: 'active',
            label: 'Active',
            type: 'switcher',
            required: true,
            placeholder: 'Select Active',
            width: 'w-full'
        }
    ]

    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries: [{ query: FIND_ALL_TASKS }, { query: COUNT_TASKS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Task created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create task';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })
        createTask({
            variables: {
                createTaskInput: {
                    title: formData.title,
                    description: formData.description?.html,
                    yearId: formData.yearId?.value,
                    badgeId: formData.badgeId?.value,
                    categoryId: formData.categoryId?.value,
                    campaignId: formData.campaignId?.value,
                    points: parseInt(formData.points),
                    startDate: formData.startDate,
                    dueDate: formData.dueDate,
                    active: formData.active
                },
            },
        }).finally(() => setLoading({ ...loading, create: false }))
    }

    const updateInputs = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            placeholder: 'Enter Task Title',
            width: 'w-full',
            value: toUpdate?.title
        },
        {
            name: 'description',
            label: 'Description',
            type: 'rte',
            required: true,
            placeholder: 'Enter Task Description',
            width: 'w-full',
            value: toUpdate?.description
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
                    value: year.id
                }))
            ],
            value: {
                label: toUpdate?.year?.name,
                value: toUpdate?.year?.id
            }
        },
        {
            name: 'badgeId',
            label: 'Badge',
            type: 'select',
            placeholder: 'Select Badge',
            width: 'w-full',
            options: [
                ...badges.map((badge) => ({
                    label: badge.name,
                    value: badge.id
                }))
            ],
            value: toUpdate?.badge ? {
                label: toUpdate?.badge?.name,
                value: toUpdate?.badge?.id
            } : undefined
        },
        {
            name: 'categoryId',
            label: 'Category',
            type: 'select',
            required: true,
            placeholder: 'Select Category',
            width: 'w-full',
            options: [
                ...categories.map((category) => ({
                    label: category.title,
                    value: category.id
                }))
            ],
            value: {
                label: toUpdate?.category?.title,
                value: toUpdate?.category?.id
            }
        },
        {
            name: 'campaignId',
            label: 'Campaign',
            type: 'select',
            placeholder: 'Select Campaign',
            width: 'w-full',
            options: [
                ...campaigns.map((campaign) => ({
                    label: campaign.title,
                    value: campaign.id
                }))
            ],
            value: toUpdate?.campaign ? {
                label: toUpdate?.campaign?.title,
                value: toUpdate?.campaign?.id
            } : undefined
        },
        {
            name: 'points',
            label: 'Points',
            type: 'number',
            required: true,
            placeholder: 'Enter Task Points',
            width: 'w-full',
            value: toUpdate?.points
        },
        {
            name: 'startDate',
            label: 'Start Date',
            type: 'date',
            required: true,
            placeholder: 'Select Start Date',
            width: 'w-full',
            value: toUpdate?.startDate ? toUpdate?.startDate : undefined
        },
        {
            name: 'dueDate',
            label: 'Due Date',
            type: 'date',
            required: true,
            placeholder: 'Select Due Date',
            width: 'w-full',
            value: toUpdate?.dueDate ? toUpdate?.dueDate : undefined
        },
        {
            name: 'active',
            label: 'Active',
            type: 'switcher',
            required: true,
            placeholder: 'Select Active',
            width: 'w-full',
            value: toUpdate?.active
        }
    ]

    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: FIND_ALL_TASKS }, { query: COUNT_TASKS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Task updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update task';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })
        updateTask({
            variables: {
                updateTaskInput: {
                    id: toUpdate?.id,
                    title: formData.title,
                    description: formData.description?.html,
                    yearId: formData.yearId?.value,
                    badgeId: formData.badgeId?.value,
                    categoryId: formData.categoryId?.value,
                    campaignId: formData.campaignId?.value,
                    points: formData.points,
                    startDate: formData.startDate,
                    dueDate: formData.dueDate,
                    active: formData.active
                },
            },
        }).finally(() => setLoading({ ...loading, update: false }))
    }

    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [{ query: FIND_ALL_TASKS }, { query: COUNT_TASKS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Task deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete task';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteTask({
            variables: {
                id: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteTasks] = useMutation(DELETE_TASKS, {
        refetchQueries: [{ query: FIND_ALL_TASKS }, { query: COUNT_TASKS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Tasks deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({});
            setIsDeleteManyOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete tasks';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteTasks({
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
                    title="Task Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <h2>{toView.title}</h2>
                            </div>
                            <div className="flex justify-between items-center">
                                <span dangerouslySetInnerHTML={{
                                    __html: toView?.description as any,
                                }}>{ }</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Year:</span>
                                <span>{toView.year?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Badge:</span>
                                <span>{toView.badge?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Category:</span>
                                <span>{toView.category?.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Campaign:</span>
                                <span>{toView.campaign?.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Points:</span>
                                <span>{toView.points}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Start Date:</span>
                                <span>{convertToYYYYMMDD(toView.startDate)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Due Date:</span>
                                <span>{convertToYYYYMMDD(toView.dueDate)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Active:</span>
                                <Tag className={toView.active ? 'bg-green-400' : 'bg-red-400'}>
                                    {toView.active ? 'Active' : 'Inactive'}
                                </Tag>                              </div>
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
                    title="Create Task"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Task"
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
                    title="Delete Task"
                    description={`Are you sure you want to delete ${toDelete?.title} task?, 
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
                    title="Delete Tasks"
                    description={`Are you sure you want to delete selected tasks?, 
                    This action cannot be undone.`}
                    toDeleteIds={Object.keys(rowSelection).map((key) => tasks[Number(key)]?.id)}
                    deleteItems={handleDeleteMany}
                    deleteLoading={loading.deleteMany}
                />
            )}
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Tasks</h3>
                            <div className="flex gap-2">
                                <DownloadButton data={tasks} />
                                <Button
                                    variant="solid"
                                    className="flex items-center"
                                    onClick={() => {
                                        setIsCreateOpen(true)
                                        setFormValues({
                                            ...formValues,
                                            active: false
                                        })
                                    }}                                >
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
                            name="task"
                            data={tasks}
                            dataCount={taskCount}
                            findAllLoading={loading.findAll || loading.count || loading.allBadges || loading.allYears || loading.allCategories || loading.allCampaigns}
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
                            actionButtons={(row: Row<Task>) => (
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
                                                    {Object.keys(rowSelection).length > 1 ? 'task' + 's' : 'task'}
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
