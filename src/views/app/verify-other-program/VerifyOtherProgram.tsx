
import { CREATE_OTHER_PROGRAM, VERIFY_OTHER_PROGRAM } from '@/graphql/mutations/other-program'
import { useSessionUser } from '@/store/authStore'
import { cloudinaryUploadAny } from '@/utils/cloudinaryUpload'
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { FaCalendarAlt } from 'react-icons/fa'
import { HiDocument, HiOutlineCloudUpload } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { Button, Card, Input, Upload } from '@/components/ui'
import { OtherProgram } from '@/generated/graphql'
import FilePdf from '@/assets/svg/files/FilePdf'
import FileDoc from '@/assets/svg/files/FileDoc'
import VerifyOtherProgramSkelton from './VerifyOtherProgramSkelton'
import { FIND_OTHER_PROGRAM_BY_ID } from '@/graphql/queries/other-program'

const VerifyOtherProgram = () => {
    const { id: otherProgramId } = useParams<{ id: string }>()
    const user = useSessionUser((state) => state.user)

    const [otherProgram, setOtherProgram] = React.useState<OtherProgram>()
    const [verifyLoading, setVerifyLoading] = React.useState(false)

    const [points, setPoints] = React.useState<number>(0)

    const { data, loading, error, refetch } = useQuery(FIND_OTHER_PROGRAM_BY_ID, {
        variables: {
            id: parseInt(otherProgramId || '1'),
        },
    })

    const updateStateAfterRefetch = async () => {
        const { data: updatedData } = await refetch()

        if (updatedData) {
            setOtherProgram(updatedData.otherProgram)
        }
    }

    const [verifyOtherProgram] = useMutation(VERIFY_OTHER_PROGRAM, {
        onCompleted: () => {
            toast.success('OtherProgram verified successfully')
            updateStateAfterRefetch()
        },
        onError: (error) => {
            toast.error('Failed to verify otherProgram')
        },
    })

    useEffect(() => {
        if (data) {
            setOtherProgram(data.otherProgram)
        }
    }, [data])

    if (loading) return <VerifyOtherProgramSkelton />

    if (error) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center gap-4 bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="text-red-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <p className="text-lg font-semibold text-gray-700 text-center">
                    {error?.message || 'Failed to fetch otherProgram'}
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 p-6 bg-gray-50">
                    <div className="flex justify-between">
                        <div className="flex gap-1 items-start">
                            <Button
                                className="text-xs mb-2"
                                size="xs"
                                style={{
                                    color: 'white', // Default text color
                                    backgroundColor: otherProgram?.category?.color || 'transparent', // Default background color
                                }}
                                onMouseEnter={(e) => {
                                    ; (e.target as HTMLElement).style.backgroundColor =
                                        'white'
                                        ; (e.target as HTMLElement).style.color =
                                            otherProgram?.category?.color || 'black'
                                        ; (e.target as HTMLElement).style.borderColor =
                                            otherProgram?.category?.color || 'transparent'
                                        ; (e.target as HTMLElement).style.boxShadow =
                                            `0 0 0 1px ${otherProgram?.category?.color || 'transparent'}`
                                }}
                                onMouseLeave={(e) => {
                                    ; (e.target as HTMLElement).style.backgroundColor =
                                        otherProgram?.category?.color || 'transparent'
                                        ; (e.target as HTMLElement).style.color = 'white'
                                }}
                            >
                                {otherProgram?.category?.title}
                            </Button>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{otherProgram?.title}</h2>
                    <p className="text-gray-600">{otherProgram?.description}</p>
                </div>
                <div className="w-full lg:w-1/2 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Verify Other Program</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter the title of your otherProgram"
                                value={otherProgram?.title as string}
                                className="w-full"
                                disabled={true}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <Input
                                id="description"
                                textArea={false}
                                placeholder="Describe your otherProgram submission"
                                value={otherProgram?.description as string}
                                className="w-full min-h-[120px]"
                                disabled={true}
                            />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {
                                (otherProgram as OtherProgram)?.files?.map((file) => (
                                    <Card className='h-20 w-20 flex items-center justify-center cursor-pointer' onClick={() => window.open(file, '_blank')}>
                                        <HiDocument className='w-8 h-8' />
                                    </Card>

                                ))
                            }
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Points
                            </label>
                            <Input
                                id="points"
                                type="number"
                                placeholder="Enter the points for above other program"
                                onChange={(e) => {
                                    setPoints(e.target.value ? parseInt(e.target.value) : 0)
                                }}
                                className="w-full"
                                disabled={otherProgram?.verified as boolean}
                            />
                        </div>
                        {
                            !otherProgram?.verified ? (
                                <Button
                                    className='w-full'
                                    onClick={() => {
                                        if (!points) {
                                            toast.error('Please enter points')
                                        } else {
                                            setVerifyLoading(true)
                                            verifyOtherProgram({
                                                variables: {
                                                    id: parseInt(otherProgramId || '1'),
                                                    points: points,
                                                }
                                            }).finally(() => { setVerifyLoading(false) })
                                        }
                                    }}
                                    variant='solid'
                                    loading={verifyLoading}
                                    disabled={verifyLoading}
                                >
                                    {verifyLoading ? 'Verifying' : 'Verify'}
                                </Button>
                            ) : (
                                <Button
                                    className='w-full'
                                    variant='solid'
                                    disabled={true}
                                >
                                    Verified
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtherProgram

