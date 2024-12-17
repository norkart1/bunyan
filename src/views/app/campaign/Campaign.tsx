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
import { Badge, Campaign, Year } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_CAMPAIGNS,
    FIND_ALL_CAMPAIGNS,
} from '@/graphql/queries/campaign'
import {
    CREATE_CAMPAIGN,
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGNS,
    UPDATE_CAMPAIGN,
} from '@/graphql/mutations/campaign'
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

export default function Campaigns() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [formValues, setFormValues] = useState<Record<string, any>>({})
    const [campaignCount, setCampaignCount] = useState(0);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [years, setYears] = useState<Year[]>([]);
    const [loading, setLoading] = useState({
        findAll: false,
        count: false,
        create: false,
        update: false,
        delete: false,
        deleteMany: false,
        allBadges: false,
        allYears: false,
    });
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [search, setSearch] = useState('');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false);
    const [toView, setToView] = useState<Campaign | null>(null);
    const [toUpdate, setToUpdate] = useState<Campaign | null>(null);
    const [toDelete, setToDelete] = useState<Campaign | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_CAMPAIGNS, {
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

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_CAMPAIGNS, {
        variables: {
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setCampaigns(findAllData.campaigns);
        }
        if (countData) {
            setCampaignCount(countData.countCampaign);
        }
        if (allBadgesData) {
            setBadges(allBadgesData.badges)
        }
        if (allYearsData) {
            setYears(allYearsData.years)
        }
        if (findAllError || countError || allBadgesError || allYearsError) {
            setErrorMessage(findAllError?.message || countError?.message || allBadgesError?.message || allYearsError?.message || 'An unknown error occurred.');
        }
        setLoading((prev) => ({
            ...prev,
            findAll: findAllLoading,
            count: countLoading,
            allBadges: allBadgesLoading,
            allYears: allYearsLoading,
        }));
    }, [findAllData, countData, allBadgesData, findAllError, countError, allBadgesError, findAllLoading, countLoading, allBadgesLoading, allYearsData, allYearsError, allYearsLoading]);

    useEffect(() => {
        if (campaignCount === 0) return;
        const totalPages = Math.ceil(campaignCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, campaignCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => campaigns[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Campaign>[]>(() => {
        return [
            {
                header: 'Title',
                accessorKey: 'title',
                enableSorting: true,
            },
            {
                header: 'Description',
                accessorKey: 'description',
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
            setCampaigns(updatedFindAllData.campaigns);
        }
        if (updatedCountData) {
            setCampaignCount(updatedCountData.countCampaign);
            const totalPages = Math.ceil(updatedCountData.countCampaign / pageSize);
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
            placeholder: 'Enter Campaign Title',
            width: 'w-full'
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: true,
            placeholder: 'Enter Campaign Description',
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
            required: true,
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
            name: 'active',
            label: 'Active',
            type: 'switcher',
            required: true,
            placeholder: 'Select Active',
            width: 'w-full'
        }
    ]

    const [createCampaign] = useMutation(CREATE_CAMPAIGN, {
        refetchQueries: [{ query: FIND_ALL_CAMPAIGNS }, { query: COUNT_CAMPAIGNS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Campaign created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create campaign';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })
        createCampaign({
            variables: {
                createCampaignInput: {
                    title: formData.title,
                    description: formData.description,
                    yearId: formData.yearId.value,
                    badgeId: formData.badgeId.value,
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
            placeholder: 'Enter Campaign Title',
            width: 'w-full',
            value: toUpdate?.title
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: true,
            placeholder: 'Enter Campaign Description',
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
            required: true,
            placeholder: 'Select Badge',
            width: 'w-full',
            options: [
                ...badges.map((badge) => ({
                    label: badge.name,
                    value: badge.id
                }))
            ],
            value: {
                label: toUpdate?.badge?.name,
                value: toUpdate?.badge?.id
            }
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

    const [updateCampaign] = useMutation(UPDATE_CAMPAIGN, {
        refetchQueries: [{ query: FIND_ALL_CAMPAIGNS }, { query: COUNT_CAMPAIGNS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Campaign updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update campaign';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })
        updateCampaign({
            variables: {
                updateCampaignInput: {
                    id: toUpdate?.id,
                    title: formData.title,
                    description: formData.description,
                    yearId: formData.yearId.value,
                    badgeId: formData.badgeId.value,
                    active: formData.active
                },
            },
        }).finally(() => setLoading({ ...loading, update: false }))
    }

    const [deleteCampaign] = useMutation(DELETE_CAMPAIGN, {
        refetchQueries: [{ query: FIND_ALL_CAMPAIGNS }, { query: COUNT_CAMPAIGNS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Campaign deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete campaign';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteCampaign({
            variables: {
                removeCampaignId: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteCampaigns] = useMutation(DELETE_CAMPAIGNS, {
        refetchQueries: [{ query: FIND_ALL_CAMPAIGNS }, { query: COUNT_CAMPAIGNS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Campaigns deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({});
            setIsDeleteManyOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete campaigns';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteCampaigns({
            variables: {
                removeCampaignIds: ids,
            },
        }).finally(() => setLoading({ ...loading, deleteMany: false }))
    }

    return (
        <>
            {isViewOpen && toView && (
                <ViewModal
                    isOpen={isViewOpen}
                    setIsOpen={setIsViewOpen}
                    title="Campaign Details"
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
                                <span className="font-semibold">Badge:</span>
                                <span>{toView.badge?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Year:</span>
                                <span>{toView.year?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Active:</span>
                                <Tag className={toView.active ? 'bg-green-400' : 'bg-red-400'}>
                                    {toView.active ? 'Active' : 'Inactive'}
                                </Tag>                            </div>
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
                    title="Create Campaign"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Campaign"
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
                    title="Delete Campaign"
                    description={`Are you sure you want to delete ${toDelete?.title} campaign?, 
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
                    title="Delete Campaigns"
                    description={`Are you sure you want to delete selected campaigns?, 
                    This action cannot be undone.`}
                    toDeleteIds={Object.keys(rowSelection).map((key) => campaigns[Number(key)]?.id)}
                    deleteItems={handleDeleteMany}
                    deleteLoading={loading.deleteMany}
                />
            )}
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Campaigns</h3>
                            <div className="flex gap-2">
                                <DownloadButton data={campaigns} />
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
                            name="campaign"
                            data={campaigns}
                            dataCount={campaignCount}
                            findAllLoading={loading.findAll || loading.count || loading.allBadges || loading.allYears}
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
                            actionButtons={(row: Row<Campaign>) => (
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
                                                    {Object.keys(rowSelection).length > 1 ? 'campaign' + 's' : 'campaign'}
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
