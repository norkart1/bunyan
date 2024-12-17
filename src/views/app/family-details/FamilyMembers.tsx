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
import {
    Member,
    HouseTypeEnum,
    RationCardTypeEnum,
    GenderEnum,
    MarriageStatusEnum,
} from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import { COUNT_MEMBERS, FIND_ALL_MEMBERS } from '@/graphql/queries/member'
import {
    CREATE_MEMBER,
    DELETE_MEMBER,
    DELETE_MEMBERS,
    UPDATE_MEMBER,
} from '@/graphql/mutations/member'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation, useParams } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { useSessionUser } from '@/store/authStore'

export default function FamilyMembers() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const { id } = useParams()

    const [formValues, setFormValues] = useState<Record<string, any>>({})

    const user = useSessionUser((state) => state.user)

    // State for members and counts
    const [memberCount, setMemberCount] = useState(0)
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState({
        findAll: false,
        count: false,
        create: false,
        update: false,
        delete: false,
        deleteMany: false,
    })
    const [errorMessage, setErrorMessage] = useState<String | null>(null)
    const [search, setSearch] = useState('')
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false)
    const [toView, setToView] = useState<Member | null>(null)
    const [toUpdate, setToUpdate] = useState<Member | null>(null)
    const [toDelete, setToDelete] = useState<Member | null>(null)
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(
        {},
    )
    const [sorting, setSorting] = useState<ColumnSort[]>([])

    const urlPageIndex = parseInt(searchParams.get('page') || '1')
    const urlPageSize = parseInt(searchParams.get('limit') || '10')
    const validatedPageIndex =
        isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1
    const validatedPageSize =
        isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize
    const [pageIndex, setPageIndex] = useState(validatedPageIndex)
    const [pageSize, setPageSize] = useState(validatedPageSize)

    const {
        refetch: refetchFindAll,
        data: findAllData,
        error: findAllError,
        loading: findAllLoading,
    } = useQuery(FIND_ALL_MEMBERS, {
        variables: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            orderBy:
                sorting.length > 0
                    ? {
                        field: sorting[0].id,
                        direction: sorting[0].desc ? 'desc' : 'asc',
                    }
                    : {},
            relationsToFilter: {},
            filters: {
                name: { contains: search, mode: 'insensitive' },
                familyId: parseInt(id as string),
            },
        },
    })

    const {
        refetch: refetchCount,
        data: countData,
        error: countError,
        loading: countLoading,
    } = useQuery(COUNT_MEMBERS, {
        variables: {
            filters: {
                name: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    })

    useEffect(() => {
        if (findAllData) {
            setMembers(findAllData.members)
        }
        if (countData) {
            setMemberCount(countData.countMember)
        }
        if (findAllError || countError) {
            setErrorMessage(
                findAllError?.message ||
                countError?.message ||
                'An unknown error occurred.',
            )
        }
        setLoading((prev) => ({
            ...prev,
            findAll: findAllLoading,
            count: countLoading,
        }))
    }, [
        findAllData,
        countData,
        findAllError,
        countError,
        findAllLoading,
        countLoading,
    ])

    useEffect(() => {
        if (memberCount === 0) return
        const totalPages = Math.ceil(memberCount / pageSize)
        const adjustedPageIndex =
            pageIndex >= totalPages ? totalPages - 1 : pageIndex
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex)
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString())
        searchParams.set('limit', pageSize.toString())
        window.history.replaceState(
            null,
            '',
            `${location.pathname}?${searchParams.toString()}`,
        )
    }, [pageIndex, pageSize, memberCount])

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => members[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Member>[]>(() => {
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
                header: 'Gender',
                accessorKey: 'gender',
                enableSorting: true,
            },
            {
                header: 'Contact',
                accessorKey: 'contact',
                enableSorting: true,
            },
            {
                header: 'Year Of Birth',
                accessorKey: 'yearOfBirth',
                enableSorting: true,
                cell: ({ row }) =>
                    row.original.yearOfBirth &&
                    convertToYYYYMMDD(row.original.yearOfBirth),
            },
        ]
    }, [])

    const updateStateAfterRefetch = async () => {
        const { data: updatedFindAllData } = await refetchFindAll()
        const { data: updatedCountData } = await refetchCount()
        if (updatedFindAllData) {
            setMembers(updatedFindAllData.members)
        }
        if (updatedCountData) {
            setMemberCount(updatedCountData.countMember);
            const totalPages = Math.ceil(updatedCountData.countMember / pageSize);
            const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
            setPageIndex(adjustedPageIndex >= 0 ? adjustedPageIndex : 0);
        }
    }

    const createInputs = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Member Name',
            width: 'w-full',
        },
        {
            name: 'contact',
            label: 'Contact',
            type: 'text',
            placeholder: 'Enter Contact',
            width: 'w-full',
        },
        {
            name: 'relationToHouseHolder',
            label: 'Relation To House Holder',
            type: 'text',
            placeholder: 'Enter Relation To House Holder',
            width: 'w-full',
        },
        {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            placeholder: 'Select Gender',
            required: true,
            width: 'w-full',
            options: [
                {
                    label: GenderEnum.Male.toString(),
                    value: GenderEnum.Male,
                },
                {
                    label: GenderEnum.Female.toString(),
                    value: GenderEnum.Female,
                },
                {
                    label: GenderEnum.Other.toString(),
                    value: GenderEnum.Other,
                },
            ],
        },
        {
            name: 'bloodGroup',
            label: 'Blood Group',
            type: 'text',
            placeholder: 'Enter Blood Group',
            width: 'w-full',
        },
        {
            name: 'yearOfBirth',
            label: 'Year Of Birth',
            type: 'date',
            placeholder: 'Enter Year Of Birth',
            width: 'w-full',
        },
        {
            name: 'healthCondition',
            label: 'Health Condition',
            type: 'text',
            placeholder: 'Enter Health Condition',
            width: 'w-full',
        },
        {
            name: 'maritalStatus',
            label: 'Marital Status',
            type: 'select',
            placeholder: 'Select Marital Status',
            width: 'w-full',
            options: [
                {
                    label: MarriageStatusEnum.Married.toString(),
                    value: MarriageStatusEnum.Married,
                },
                {
                    label: MarriageStatusEnum.Unmarried.toString(),
                    value: MarriageStatusEnum.Unmarried,
                },
                {
                    label: MarriageStatusEnum.Widowed.toString(),
                    value: MarriageStatusEnum.Widowed,
                },
                {
                    label: MarriageStatusEnum.Divorced.toString(),
                    value: MarriageStatusEnum.Divorced,
                },
                {
                    label: MarriageStatusEnum.Separated.toString(),
                    value: MarriageStatusEnum.Separated,
                },
            ],
        },
        {
            name: 'job',
            label: 'Job',
            type: 'text',
            placeholder: 'Enter Job',
            width: 'w-full',
        },
        {
            name: 'jobSector',
            label: 'Job Sector',
            type: 'text',
            placeholder: 'Enter Job Sector',
            width: 'w-full',
        },
        {
            name: 'abroad',
            label: 'Abroad',
            type: 'select',
            placeholder: 'Select Is Abroad',
            width: 'w-full',
            options: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
        },
        {
            name: 'abroadPlace',
            label: 'Abroad Place',
            type: 'text',
            placeholder: 'Enter Abroad Place',
            width: 'w-full',
        },
        {
            name: 'skills',
            label: 'Skills',
            type: 'text',
            placeholder: 'Enter Skills [Separated by comma]',
            width: 'w-full',
        },
        {
            name: 'orphan',
            label: 'Orphan',
            type: 'select',
            placeholder: 'Select Is Orphan',
            width: 'w-full',
            options: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
        },
        {
            name: 'islamicQualification',
            label: 'Islamic Qualification',
            type: 'text',
            placeholder: 'Enter Islamic Qualification',
            width: 'w-full',
        },
        {
            name: 'generalQualification',
            label: 'General Qualification',
            type: 'text',
            placeholder: 'Enter General Qualification',
            width: 'w-full',
        },
        {
            name: 'remarks',
            label: 'Remarks',
            type: 'textarea',
            placeholder: 'Enter Remarks',
            width: 'w-full',
        },
    ]

    const [createMember] = useMutation(CREATE_MEMBER, {
        refetchQueries: [{ query: FIND_ALL_MEMBERS }, { query: COUNT_MEMBERS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Member created successfully', {
                id: 'toastId',
                duration: 5000,
            })
            updateStateAfterRefetch()
            setIsCreateOpen(false)
            setFormValues({})
        },
        onError: (error) => {
            const message =
                error.graphQLErrors[0]?.message || 'Failed to create member'
            setErrorMessage(message)
            toast.error(message, { id: 'toastId', duration: 5000 })
        },
    })

    function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })
        createMember({
            variables: {
                createMemberInput: {
                    name: formData.name,
                    familyId: parseInt(id as string),
                    contact: formData.contact,
                    relationToHouseHolder: formData.relationToHouseHolder,
                    gender: formData.gender.value,
                    bloodGroup: formData.bloodGroup,
                    yearOfBirth: formData.yearOfBirth,
                    healthCondition: formData.healthCondition,
                    maritalStatus: formData.maritalStatus?.value,
                    job: formData.job,
                    jobSector: formData.jobSector,
                    abroad: formData.abroad?.value,
                    abroadPlace: formData.abroadPlace,
                    skills: formData.skills
                        ?.split(',')
                        ?.map((skill: string) => skill.trim()),
                    orphan: formData.orphan?.value,
                    islamicQualification: formData.islamicQualification,
                    generalQualification: formData.generalQualification,
                    remarks: formData.remarks,
                },
            },
        }).finally(() => setLoading({ ...loading, create: false }))
    }

    const updateInputs = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Member Name',
            width: 'w-full',
            value: toUpdate?.name,
        },
        {
            name: 'contact',
            label: 'Contact',
            type: 'text',
            placeholder: 'Enter Contact',
            width: 'w-full',
            value: toUpdate?.contact,
        },
        {
            name: 'relationToHouseHolder',
            label: 'Relation To House Holder',
            type: 'text',
            placeholder: 'Enter Relation To House Holder',
            width: 'w-full',
            value: toUpdate?.relationToHouseHolder,
        },
        {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            placeholder: 'Select Gender',
            width: 'w-full',
            required: true,
            options: [
                {
                    label: GenderEnum.Male.toString(),
                    value: GenderEnum.Male,
                },
                {
                    label: GenderEnum.Female.toString(),
                    value: GenderEnum.Female,
                },
                {
                    label: GenderEnum.Other.toString(),
                    value: GenderEnum.Other,
                },
            ],
            value: {
                label: toUpdate?.gender?.toString(),
                value: toUpdate?.gender,
            },
        },
        {
            name: 'bloodGroup',
            label: 'Blood Group',
            type: 'text',
            placeholder: 'Enter Blood Group',
            width: 'w-full',
            value: toUpdate?.bloodGroup,
        },
        {
            name: 'yearOfBirth',
            label: 'Year Of Birth',
            type: 'date',
            placeholder: 'Enter Year Of Birth',
            width: 'w-full',
            value: toUpdate?.yearOfBirth ? toUpdate?.yearOfBirth : undefined,
        },
        {
            name: 'healthCondition',
            label: 'Health Condition',
            type: 'text',
            placeholder: 'Enter Health Condition',
            width: 'w-full',
            value: toUpdate?.healthCondition,
        },
        {
            name: 'maritalStatus',
            label: 'Marital Status',
            type: 'select',
            placeholder: 'Select Marital Status',
            width: 'w-full',
            options: [
                {
                    label: MarriageStatusEnum.Married.toString(),
                    value: MarriageStatusEnum.Married,
                },
                {
                    label: MarriageStatusEnum.Unmarried.toString(),
                    value: MarriageStatusEnum.Unmarried,
                },
                {
                    label: MarriageStatusEnum.Widowed.toString(),
                    value: MarriageStatusEnum.Widowed,
                },
                {
                    label: MarriageStatusEnum.Divorced.toString(),
                    value: MarriageStatusEnum.Divorced,
                },
                {
                    label: MarriageStatusEnum.Separated.toString(),
                    value: MarriageStatusEnum.Separated,
                },
            ],
            value: toUpdate?.maritalStatus ? {
                label: toUpdate?.maritalStatus?.toString(),
                value: toUpdate?.maritalStatus,
            } : undefined,
        },
        {
            name: 'job',
            label: 'Job',
            type: 'text',
            placeholder: 'Enter Job',
            width: 'w-full',
            value: toUpdate?.job,
        },
        {
            name: 'jobSector',
            label: 'Job Sector',
            type: 'text',
            placeholder: 'Enter Job Sector',
            width: 'w-full',
            value: toUpdate?.jobSector,
        },
        {
            name: 'abroad',
            label: 'Abroad',
            type: 'select',
            placeholder: 'Select Is Abroad',
            width: 'w-full',
            options: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
            value: toUpdate?.abroad ? {
                label: toUpdate?.abroad ? 'Yes' : 'No',
                value: toUpdate?.abroad,
            } : undefined,
        },
        {
            name: 'abroadPlace',
            label: 'Abroad Place',
            type: 'text',
            placeholder: 'Enter Abroad Place',
            width: 'w-full',
            value: toUpdate?.abroadPlace,
        },
        {
            name: 'skills',
            label: 'Skills',
            type: 'text',
            placeholder: 'Enter Skills [Separated by comma]',
            width: 'w-full',
            value: toUpdate?.skills?.join(', '),
        },
        {
            name: 'orphan',
            label: 'Orphan',
            type: 'select',
            placeholder: 'Select Is Orphan',
            width: 'w-full',
            options: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
            value: toUpdate?.orphan ? {
                label: toUpdate?.orphan ? 'Yes' : 'No',
                value: toUpdate?.orphan,
            } : undefined,
        },
        {
            name: 'islamicQualification',
            label: 'Islamic Qualification',
            type: 'text',
            placeholder: 'Enter Islamic Qualification',
            width: 'w-full',
            value: toUpdate?.islamicQualification,
        },
        {
            name: 'generalQualification',
            label: 'General Qualification',
            type: 'text',
            placeholder: 'Enter General Qualification',
            width: 'w-full',
            value: toUpdate?.generalQualification,
        },
        {
            name: 'remarks',
            label: 'Remarks',
            type: 'textarea',
            placeholder: 'Enter Remarks',
            width: 'w-full',
            value: toUpdate?.remarks,
        },
    ]

    const [updateMember] = useMutation(UPDATE_MEMBER, {
        refetchQueries: [{ query: FIND_ALL_MEMBERS }, { query: COUNT_MEMBERS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Member updated successfully', {
                id: 'toastId',
                duration: 5000,
            })
            updateStateAfterRefetch()
            setIsUpdateOpen(false)
            setFormValues({})
        },
        onError: (error) => {
            const message =
                error.graphQLErrors[0]?.message || 'Failed to update member'
            setErrorMessage(message)
            toast.error(message, { id: 'toastId', duration: 5000 })
        },
    })

    function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })
        updateMember({
            variables: {
                updateMemberInput: {
                    id: toUpdate?.id,
                    name: formData.name,
                    familyId: parseInt(id as string),
                    contact: formData.contact,
                    relationToHouseHolder: formData.relationToHouseHolder,
                    gender: formData.gender.value,
                    bloodGroup: formData.bloodGroup,
                    yearOfBirth: formData.yearOfBirth ? new Date(formData.yearOfBirth) : undefined,
                    healthCondition: formData.healthCondition,
                    maritalStatus: formData.maritalStatus?.value,
                    job: formData.job,
                    jobSector: formData.jobSector,
                    abroad: formData.abroad?.value,
                    abroadPlace: formData.abroadPlace,
                    skills: formData.skills
                        ?.split(',')
                        ?.map((skill: string) => skill.trim()),
                    orphan: formData.orphan?.value,
                    islamicQualification: formData.islamicQualification,
                    generalQualification: formData.generalQualification,
                    remarks: formData.remarks,
                },
            },
        }).finally(() => setLoading({ ...loading, update: false }))
    }

    const [deleteMember] = useMutation(DELETE_MEMBER, {
        refetchQueries: [{ query: FIND_ALL_MEMBERS }, { query: COUNT_MEMBERS }],
        awaitRefetchQueries: true, // Ensures refetch completes before moving on
        onCompleted: (data) => {
            toast.success('Member deleted successfully', {
                id: 'toastId',
                duration: 5000,
            })
            updateStateAfterRefetch()
            setIsDeleteOpen(false) // Close modal
        },
        onError: (error) => {
            const message =
                error.graphQLErrors[0]?.message || 'Failed to delete member'
            setErrorMessage(message)
            toast.error(message, { id: 'toastId', duration: 5000 })
        },
    })

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deleteMember({
            variables: {
                removeMemberId: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deleteMembers] = useMutation(DELETE_MEMBERS, {
        refetchQueries: [{ query: FIND_ALL_MEMBERS }, { query: COUNT_MEMBERS }],
        awaitRefetchQueries: true, // Ensures refetch completes before moving on
        onCompleted: (data) => {
            toast.success('Members deleted successfully', {
                id: 'toastId',
                duration: 5000,
            })
            updateStateAfterRefetch()
            setRowSelection({}) // Clear row selection
            setIsDeleteManyOpen(false) // Close modal
        },
        onError: (error) => {
            const message =
                error.graphQLErrors[0]?.message || 'Failed to delete members'
            setErrorMessage(message)
            toast.error(message, { id: 'toastId', duration: 5000 })
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deleteMembers({
            variables: {
                removeMemberIds: ids,
            },
        }).finally(() => setLoading({ ...loading, deleteMany: false }))
    }

    return (
        <>
            {isViewOpen && toView && (
                <ViewModal
                    isOpen={isViewOpen}
                    setIsOpen={setIsViewOpen}
                    title="Member Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Name:</span>
                                <span>{toView.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Contact:</span>
                                <span>{toView.contact}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Relation To House Holder:
                                </span>
                                <span>{toView.relationToHouseHolder}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Gender:
                                </span>
                                <span>{toView.gender}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Blood Group:
                                </span>
                                <span>{toView.bloodGroup}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Year Of Birth:
                                </span>
                                <span>
                                    {toView.yearOfBirth ? convertToYYYYMMDD(toView.yearOfBirth) : ''}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Health Condition:
                                </span>
                                <span>{toView.healthCondition}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Marital Status:
                                </span>
                                <span>{toView.maritalStatus}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Job:</span>
                                <span>{toView.job}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Job Sector:</span>
                                <span>{toView.jobSector}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Abroad:</span>
                                <span>{toView.abroad ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Abroad Place:</span>
                                <span>{toView.abroadPlace}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Skills:</span>
                                <span>{toView.skills?.join(', ')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Orphan:</span>
                                <span>{toView.orphan ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Islamic Qualification:
                                </span>
                                <span>{toView.islamicQualification}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    General Qualification:
                                </span>
                                <span>{toView.generalQualification}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Remarks:</span>
                                <span>{toView.remarks}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Created At:
                                </span>
                                <span>
                                    {convertToYYYYMMDD(toView.createdAt)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                    Updated At:
                                </span>
                                <span>
                                    {convertToYYYYMMDD(toView.updatedAt)}
                                </span>
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
                    title="Create Member"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Member"
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
                    title="Delete Member"
                    description={`Are you sure you want to delete ${toDelete?.name} member?, 
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
                    title="Delete Members"
                    description={`Are you sure you want to delete selected members?, 
                        This action cannot be undone.`}
                    toDeleteIds={Object.keys(rowSelection).map(
                        (key) => members[Number(key)]?.id,
                    )}
                    deleteItems={handleDeleteMany}
                    deleteLoading={loading.deleteMany}
                />
            )}
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Members</h3>
                            <div className="flex gap-2">
                                {/* <DownloadButton data={members} /> */}
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
                            name="member"
                            data={members}
                            dataCount={memberCount}
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
                            actionButtons={(row: Row<Member>) => (
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
                {Object.keys(rowSelection).length > 0 && (
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
                                                    {
                                                        Object.keys(
                                                            rowSelection,
                                                        ).length
                                                    }{' '}
                                                    {Object.keys(rowSelection)
                                                        .length > 1
                                                        ? 'member' + 's'
                                                        : 'member'}
                                                </span>
                                                <span>selected</span>
                                            </span>
                                        </span>
                                    )}
                                </span>

                                <div className="flex items-center">
                                    <Button
                                        size="sm"
                                        className="mr-3 button bg-white border dark:bg-gray-700 dark:border-gray-700 dark:ring-white dark:hover:border-white hover:ring-1 dark:hover:text-white dark:hover:bg-transparent dark:text-gray-100 h-10 rounded-xl px-3 py-2 text-sm button-press-feedback border-gray-400 ring-1 ring-gray-400 text-gray-500 hover:border-gray-500 hover:ring-gray-500 hover:text-gray-500"
                                        onClick={() => setRowSelection({})}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                        }
                                        onClick={() =>
                                            setIsDeleteManyOpen(true)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </StickyFooter>
                )}
            </Container>
        </>
    )
}
