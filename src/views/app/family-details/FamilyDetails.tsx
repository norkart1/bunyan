import { useParams } from 'react-router-dom'
import { FIND_FAMILY_BY_ID } from '@/graphql/queries/family'
import { useMutation, useQuery } from '@apollo/client'
import FamilyMembers from './FamilyMembers'
import { Family, HouseTypeEnum, RationCardTypeEnum } from '@/generated/graphql'
import { useEffect, useState } from 'react'
import { UPDATE_FAMILY } from '@/graphql/mutations/family'
import toast from 'react-hot-toast'
import { useSessionUser } from '@/store/authStore'
import UpdateModal from '@/components/dynamic/UpdateModal'
import { Button, Tooltip } from '@/components/ui'
import { TbPencil } from 'react-icons/tb'

export default function FamilyDetails() {
    const { id } = useParams()

    const [family, setFamily] = useState<Family | null>(null)
    const [toUpdate, setToUpdate] = useState<Family | null>(null)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [formValues, setFormValues] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [updateLoading, setUpdateLoading] = useState(false)

    const { refetch: refetchFamily, data, loading, error } = useQuery(FIND_FAMILY_BY_ID, {
        variables: { id: parseInt(id as string) },
    })

    useEffect(() => {
        if (data) {
            setFamily(data.family)
        }
        if (error) {
            setErrorMessage(error.message)
        }
        setUpdateLoading(loading)
    }, [data, error, loading])

    const user = useSessionUser((state) => state.user)

    const updateInputs = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Family Name',
            width: 'w-full',
            value: toUpdate?.name,
        },
        {
            name: 'block',
            label: 'Block',
            type: 'text',
            required: true,
            placeholder: 'Enter Block',
            width: 'w-full',
            value: toUpdate?.block,
        },
        {
            name: 'houseHolder',
            label: 'House Holder',
            type: 'text',
            required: true,
            placeholder: 'Enter House Holder',
            width: 'w-full',
            value: toUpdate?.houseHolder,
        },
        {
            name: 'houseName',
            label: 'House Name',
            type: 'text',
            required: true,
            placeholder: 'Enter House Name',
            width: 'w-full',
            value: toUpdate?.houseName,
        },
        {
            name: 'houseNumber',
            label: 'House Number',
            type: 'text',
            required: true,
            placeholder: 'Enter House Number',
            width: 'w-full',
            value: toUpdate?.houseNumber,
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
            value: {
                label: toUpdate?.houseType?.toString(),
                value: toUpdate?.houseType
            },
        },
        {
            name: 'mobile',
            label: 'Mobile',
            type: 'text',
            required: true,
            placeholder: 'Enter Mobile',
            width: 'w-full',
            value: toUpdate?.mobile,
        },
        {
            name: 'whatsapp',
            label: 'Whatsapp',
            type: 'text',
            required: true,
            placeholder: 'Enter Whatsapp',
            width: 'w-full',
            value: toUpdate?.whatsapp
        },
        {
            name: 'panchayathMunicipality',
            label: 'Panchayath Municipality',
            type: 'text',
            required: true,
            placeholder: 'Enter Panchayath Municipality',
            width: 'w-full',
            value: toUpdate?.panchayathMunicipality,
        },
        {
            name: 'panchayathWardNo',
            label: 'Panchayath Ward No',
            type: 'text',
            required: true,
            placeholder: 'Enter Panchayath Ward No',
            width: 'w-full',
            value: toUpdate?.panchayathWardNo,
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
            name: 'rationCardType',
            label: 'Ration Card Type',
            type: 'select',
            required: true,
            placeholder: 'Enter Ration Card Type',
            width: 'w-full',
            options: [
                { label: RationCardTypeEnum.Apl.toString(), value: RationCardTypeEnum.Apl },
                { label: RationCardTypeEnum.Bpl.toString(), value: RationCardTypeEnum.Bpl },
            ],
            value: {
                label: toUpdate?.rationCardType?.toString(),
                value: toUpdate?.rationCardType
            }
        },
        {
            name: 'wardHouseNo',
            label: 'Ward House No',
            type: 'text',
            required: true,
            placeholder: 'Enter Ward House No',
            width: 'w-full',
            value: toUpdate?.wardHouseNo,
        },
    ]

    const updateStateAfterRefetch = async () => {
        const { data: updatedFamily } = await refetchFamily()

        console.log('updatedFamily', updatedFamily)

        if (updatedFamily) {
            setFamily(updatedFamily.family)
        }
    }

    const [updateFamily] = useMutation(UPDATE_FAMILY, {
        refetchQueries: [{
            query: FIND_FAMILY_BY_ID, variables: {
                id: parseInt(id as string)
            }
        }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Family updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update family';
            setErrorMessage(message)
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleUpdate(formData: Record<string, any>) {
        setUpdateLoading(true)
        updateFamily({
            variables: {
                updateFamilyInput: {
                    id: toUpdate?.id,
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
        }).finally(() => setUpdateLoading(false))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Family"
                    inputs={updateInputs}
                    updateItem={handleUpdate}
                    updateLoading={updateLoading}
                    formValues={formValues}
                    setFormValues={setFormValues}
                />
            )}
            <div className="flex flex-col space-y-6">
                {loading && <p className="text-gray-600 text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error.message}</p>}

                {data && (
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{family?.name}</h2>
                                <Button
                                    onClick={() => {
                                        setToUpdate(data.family)
                                        setIsUpdateOpen(true)
                                    }}
                                    variant='plain'
                                    className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                                >
                                    <TbPencil className="w-6 h-6" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <InfoItem label="Reg No" value={family?.regNo} />
                                <InfoItem label="House Name" value={family?.houseName} />
                                <InfoItem label="House Type" value={family?.houseType} />
                                <InfoItem label="House Holder" value={family?.houseHolder} />
                                <InfoItem label="Mobile" value={family?.mobile} />
                                <InfoItem label="WhatsApp" value={family?.whatsapp} />
                                <InfoItem label="Place" value={family?.place} />
                                <InfoItem label="Block" value={family?.block} />
                                <InfoItem label="Ration Card Type" value={family?.rationCardType} />
                                <InfoItem label="Ward House No" value={family?.wardHouseNo} />
                                <InfoItem label="Panchayath Ward No" value={family?.panchayathWardNo} />
                                <InfoItem label="Panchayath Municipality" value={family?.panchayathMunicipality} />
                            </div>
                        </div>
                    </div>
                )}

                <FamilyMembers />
            </div>
        </div>
    )
}

function InfoItem({ label, value }: {
    label: string;
    value: any
}) {
    return (
        <div className="flex gap-2 mb-2">
            <span className="text-sm font-medium text-gray-500">{label}:</span>
            <p className="text-gray-800">{value || 'N/A'}</p>
        </div>
    )
}
