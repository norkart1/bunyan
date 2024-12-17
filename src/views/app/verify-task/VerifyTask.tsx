
import { CREATE_TASK_PARTICIPANT, VERIFY_TASK_PARTICIPANT } from '@/graphql/mutations/task-participant'
import { useSessionUser } from '@/store/authStore'
import { cloudinaryUploadAny } from '@/utils/cloudinaryUpload'
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { FaCalendarAlt } from 'react-icons/fa'
import { HiDocument, HiOutlineCloudUpload } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { Button, Card, Input, Upload } from '@/components/ui'
import { TaskParticipant } from '@/generated/graphql'
import FilePdf from '@/assets/svg/files/FilePdf'
import FileDoc from '@/assets/svg/files/FileDoc'
import VerifyTaskParticipantSkelton from './VerifyTaskSkelton'
import { FIND_ONE_TASK_PARTICIPANT } from '@/graphql/queries/task-participant'

const VerifyTaskParticipant = () => {
    const { id: taskParticipantId } = useParams<{ id: string }>()
    const user = useSessionUser((state) => state.user)

    const [taskParticipant, setTaskParticipant] = React.useState<TaskParticipant>()
    const [verifyLoading, setVerifyLoading] = React.useState(false)

    const { data, loading, error, refetch } = useQuery(FIND_ONE_TASK_PARTICIPANT, {
        variables: {
            id: parseInt(taskParticipantId || '1'),
        },
    })

    const updateStateAfterRefetch = async () => {
        const { data: updatedData } = await refetch()

        if (updatedData) {
            setTaskParticipant(updatedData.taskParticipant)
        }
    }

    const [verifyTaskParticipant] = useMutation(VERIFY_TASK_PARTICIPANT, {
        onCompleted: () => {
            toast.success('TaskParticipant verified successfully')
            updateStateAfterRefetch()
        },
        onError: (error) => {
            toast.error('Failed to verify taskParticipant')
        },
    })

    useEffect(() => {
        if (data) {
            setTaskParticipant(data.taskParticipant)
        }
    }, [data])

    if (loading) return <VerifyTaskParticipantSkelton />

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
                    {error?.message || 'Failed to fetch taskParticipant'}
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
                                    backgroundColor: taskParticipant?.task?.category?.color || 'transparent', // Default background color
                                }}
                                onMouseEnter={(e) => {
                                    ; (e.target as HTMLElement).style.backgroundColor =
                                        'white'
                                        ; (e.target as HTMLElement).style.color =
                                            taskParticipant?.task?.category?.color || 'black'
                                        ; (e.target as HTMLElement).style.borderColor =
                                            taskParticipant?.task?.category?.color || 'transparent'
                                        ; (e.target as HTMLElement).style.boxShadow =
                                            `0 0 0 1px ${taskParticipant?.task?.category?.color || 'transparent'}`
                                }}
                                onMouseLeave={(e) => {
                                    ; (e.target as HTMLElement).style.backgroundColor =
                                        taskParticipant?.task?.category?.color || 'transparent'
                                        ; (e.target as HTMLElement).style.color = 'white'
                                }}
                            >
                                {taskParticipant?.task?.category?.title}
                            </Button>
                            {
                                taskParticipant?.task?.campaign && (
                                    <Button
                                        className="transition-all duration-500 bg-gray-700 text-xs text-neutral hover:bg-neutral hover:!ring-gray-700 hover:!border-gray-700  hover:text-gray-700 flex gap-2 items-center justify-center"
                                        size="xs"
                                    >
                                        {taskParticipant?.task?.campaign.title}
                                    </Button>
                                )
                            }
                        </div>
                        <div>
                            {
                                taskParticipant?.task?.badge && (
                                    <img
                                        src={taskParticipant?.task?.badge.icon as string}
                                        alt={taskParticipant?.task?.badge.name as string}
                                        className="w-8 h-8 rounded-full"
                                    />
                                )
                            }
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{taskParticipant?.task?.title}</h2>
                    <p className="text-gray-600">{taskParticipant?.task?.description}</p>
                </div>
                <div className="w-full lg:w-1/2 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Verify Task Participant</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter the title of your taskParticipant"
                                value={taskParticipant?.title as string}
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
                                placeholder="Describe your taskParticipant submission"
                                value={taskParticipant?.description as string}
                                className="w-full min-h-[120px]"
                                disabled={true}
                            />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {
                                (taskParticipant as TaskParticipant)?.files?.map((file) => (
                                    <Card className='h-20 w-20 flex items-center justify-center cursor-pointer' onClick={() => window.open(file, '_blank')}>
                                        <HiDocument className='w-8 h-8' />
                                    </Card>

                                ))
                            }
                        </div>
                        {
                            !taskParticipant?.verified ? (
                                <Button
                                    className="w-full text-sm bg-primary hover:bg-primary-mild text-white font-medium"
                                    onClick={() => {
                                        setVerifyLoading(true)
                                        verifyTaskParticipant({
                                            variables: {
                                                id: parseInt(taskParticipantId || '1')
                                            }
                                        }).finally(() => { setVerifyLoading(false) })
                                    }}
                                    variant='solid'
                                    loading={verifyLoading}
                                    disabled={verifyLoading}
                                >
                                    {verifyLoading ? 'Verifying' : 'Verify'}
                                </Button>
                            ) : (
                                <Button
                                    className="w-full text-sm bg-info hover:bg-blue-400 text-white font-medium"
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

export default VerifyTaskParticipant

