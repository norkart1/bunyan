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
import { Family, HouseTypeEnum, RationCardTypeEnum } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_FAMILIES,
    FIND_ALL_FAMILIES,
} from '@/graphql/queries/family'
import {
    CREATE_FAMILY,
    DELETE_FAMILY,
    DELETE_FAMILIES,
    UPDATE_FAMILY,
} from '@/graphql/mutations/family'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { useSessionUser } from '@/store/authStore'

export default function Families() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<Record<string, any>>({})

    const user = useSessionUser((state) => state.user)

    // State for families and counts
    const [familyCount, setFamilyCount] = useState(0);
    const [families, setFamilies] = useState<Family[]>([]);
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
    const [toView, setToView] = useState<Family | null>(null);
    const [toUpdate, setToUpdate] = useState<Family | null>(null);
    const [toDelete, setToDelete] = useState<Family | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_FAMILIES, {
        variables: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            orderBy: sorting.length > 0 ? { field: sorting[0].id, direction: sorting[0].desc ? 'desc' : 'asc' } : {},
            relationsToFilter: {},
            filters: {
                name: { contains: search, mode: 'insensitive' },
                mahalluId: user?.mahalluId
            },
        },
    });

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_FAMILIES, {
        variables: {
            filters: {
                name: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setFamilies(findAllData.families);
        }
        if (countData) {
            setFamilyCount(countData.countFamily);
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
        if (familyCount === 0) return;
        const totalPages = Math.ceil(familyCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, familyCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => families[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Family>[]>(() => {
        return [
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
                header: 'House Holder',
                accessorKey: 'houseHolder',
                enableSorting: true,
            },
            {
                header: 'House Name',
                accessorKey: 'houseName',
                enableSorting: true,
            },
            {
                header: 'House Number',
                accessorKey: 'houseNumber',
                enableSorting: true,
            },
            {
                header: 'Mobile',
                accessorKey: 'mobile',
                enableSorting: true,
            },
        ]
    }, [])

    const updateStateAfterRefetch = async () => {
        const { data: updatedFindAllData } = await refetchFindAll();
        const { data: updatedCountData } = await refetchCount();
        if (updatedFindAllData) {
            setFamilies(updatedFindAllData.families);
        }
        if (updatedCountData) {
            setFamilyCount(updatedCountData.countFamily);
            const totalPages = Math.ceil(updatedCountData.countFamily / pageSize);
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
            placeholder: 'Enter Family Name',
            width: 'w-full',
        },
        {
            name: 'block',
            label: 'Block',
            type: 'text',
            required: true,
            placeholder: 'Enter Block',
            width: 'w-full',
        },
        {
            name: 'houseHolder',
            label: 'House Holder',
            type: 'text',
            required: true,
            placeholder: 'Enter House Holder',
            width: 'w-full',
        },
        {
            name: 'houseName',
            label: 'House Name',
            type: 'text',
            required: true,
            placeholder: 'Enter House Name',
            width: 'w-full',
        },
        {
            name: 'houseNumber',
            label: 'House Number',
            type: 'text',
            required: true,
            placeholder: 'Enter House Number',
            width: 'w-full',
        },
        {
            name: 'houseType',
            label: 'House Type',
            type: 'select',
            required: true,
            placeholder: 'Enter House Type',
            width: 'w-full',
            options: [
                { label: HouseTypeEnum.Own.toString(), value: HouseTypeEnum.Own },
                { label: HouseTypeEnum.Rent.toString(), value: HouseTypeEnum.Rent },
            ],
        },
        {
            name: 'mobile',
            label: 'Mobile',
            type: 'text',
            required: true,
            placeholder: 'Enter Mobile',
            width: 'w-full',
        },
        {
            name: 'whatsapp',
            label: 'Whatsapp',
            type: 'text',
            required: true,
            placeholder: 'Enter Whatsapp',
            width: 'w-full',
        },
        {
            name: 'panchayathMunicipality',
            label: 'Panchayath Municipality',
            type: 'text',
            required: true,
            placeholder: 'Enter Panchayath Municipality',
            width: 'w-full',
        },
        {
            name: 'panchayathWardNo',
            label: 'Panchayath Ward No',
            type: 'text',
            required: true,
            placeholder: 'Enter Panchayath Ward No',
            width: 'w-full',
        },
        {
            name: 'place',
            label: 'Place',
            type: 'text',
            required: true,
            placeholder: 'Enter Place',
            width: 'w-full',
        },
        {
            name: 'rationCardType',
            label: 'Ration Card Type',
            type: 'select',
            required: true,
            placeholder: 'Enter Ration Card Type',
            width: 'w-full',
            options: [
                { label: RationCardTypeEnum.Apl.toString(), value: RationCardTypeEnum.Apl.toString() },
                { label: RationCardTypeEnum.Bpl.toString(), value: RationCardTypeEnum.Bpl.toString() },
            ],
        },
        {
            name: 'wardHouseNo',
            label: 'Ward House No',
            type: 'text',
            required: true,
            placeholder: 'Enter Ward House No',
            width: 'w-full',
        },
    ]

    const [createFamily] = useMutation(CREATE_FAMILY, {
        refetchQueries: [{ query: FIND_ALL_FAMILIES }, { query: COUNT_FAMILIES }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Family created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create family';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })
        createFamily({
            variables: {
                createFamilyInput: {
                    name: formData.name,
                    mahalluId: user?.mahalluId,
                    block: formData.block,
                    houseHolder: formData.houseHolder,
                    houseName: formData.houseName,
                    houseNumber: formData.houseNumber,
                    houseType: formData.houseType.value,
                    mobile: formData.mobile,
                    whatsapp: formData.whatsapp,
                    panchayathMunicipality: formData.panchayathMunicipality,
                    panchayathWardNo: formData.panchayathWardNo,
                    place: formData.place,
                    rationCardType: formData.rationCardType.value,
                    wardHouseNo: formData.wardHouseNo,
                },
            },
        }).finally(() => setLoading({ ...loading, create: false }))
    }

    const [deleteFamily] = useMutation(DELETE_FAMILY, {
        refetchQueries: [{ query: FIND_ALL_FAMILIES }, { query: COUNT_FAMILIES }],
        awaitRefetchQueries: true, // Ensures refetch completes before moving on
        onCompleted: (data) => {
            toast.success('Family deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false); // Close modal
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete family';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteFamily({
            variables: {
                removeFamilyId: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteFamilies] = useMutation(DELETE_FAMILIES, {
        refetchQueries: [{ query: FIND_ALL_FAMILIES }, { query: COUNT_FAMILIES }],
        awaitRefetchQueries: true, // Ensures refetch completes before moving on
        onCompleted: (data) => {
            toast.success('Families deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({}); // Clear row selection
            setIsDeleteManyOpen(false); // Close modal
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete families';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteFamilies({
            variables: {
                removeFamilyIds: ids,
            },
        }).finally(() => setLoading({ ...loading, deleteMany: false }))
    }

    return (
        <>
            {isViewOpen && toView && (
                <ViewModal
                    isOpen={isViewOpen}
                    setIsOpen={setIsViewOpen}
                    title="Family Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Name:</span>
                                <span>{toView.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Block:</span>
                                <span>{toView.block}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">House Holder:</span>
                                <span>{toView.houseHolder}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">House Name:</span>
                                <span>{toView.houseName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">House Number:</span>
                                <span>{toView.houseNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">House Type:</span>
                                <span>{toView.houseType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Mobile:</span>
                                <span>{toView.mobile}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Whatsapp:</span>
                                <span>{toView.whatsapp}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Panchayath Municipality:</span>
                                <span>{toView.panchayathMunicipality}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Panchayath Ward No:</span>
                                <span>{toView.panchayathWardNo}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Place:</span>
                                <span>{toView.place}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Ration Card Type:</span>
                                <span>{toView.rationCardType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Ward House No:</span>
                                <span>{toView.wardHouseNo}</span>
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
                    title="Create Family"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isDeleteOpen && toDelete && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    setIsOpen={setIsDeleteOpen}
                    title="Delete Family"
                    description={`Are you sure you want to delete ${toDelete?.name} family?, 
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
                        title="Delete Families"
                        description={`Are you sure you want to delete selected families?, 
                        This action cannot be undone.`}
                        toDeleteIds={Object.keys(rowSelection).map((key) => families[Number(key)]?.id)}
                        deleteItems={handleDeleteMany}
                        deleteLoading={loading.deleteMany}
                    />
                )
            }
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Families</h3>
                            <div className="flex gap-2">
                                <DownloadButton data={families} />
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
                            name="family"
                            data={families}
                            dataCount={familyCount}
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
                            actionButtons={(row: Row<Family>) => (
                                <div className="flex items-center gap-3">
                                    <Tooltip title="View">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                navigate('/family/' + row.original.id)
                                            }}
                                        >
                                            <TbEye />
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
                                                    {Object.keys(rowSelection).length > 1 ? 'family' + 's' : 'family'}
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
