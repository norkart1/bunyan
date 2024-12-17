import {
    CLAIM_TASK_PARTICIPANT,
    CREATE_TASK_PARTICIPANT,
} from '@/graphql/mutations/task-participant'
import { FIND_ONE_TASK } from '@/graphql/queries/task'
import { useSessionUser } from '@/store/authStore'
import { cloudinaryUploadAny } from '@/utils/cloudinaryUpload'
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaCalendarAlt } from 'react-icons/fa'
import { HiDocument, HiOutlineCloudUpload } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import SubmitTaskSkeleton from './SubmitTaskSkelton'
import { Button, Card, Input, Upload } from '@/components/ui'
import { Task, TaskParticipant } from '@/generated/graphql'
import Confetti from 'react-confetti'

const SubmitTask = () => {
    const { id: taskId } = useParams<{ id: string }>()
    const user = useSessionUser((state) => state.user)

    const [task, setTask] = React.useState<Task>()
    const [submitLoading, setSubmitLoading] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [files, setFiles] = React.useState<File[]>([])

    const [showConfetti, setShowConfetti] = useState(false)
    const [claimLoading, setClaimLoading] = useState(false)

    const { data, loading, error, refetch } = useQuery(FIND_ONE_TASK, {
        variables: {
            id: parseInt(taskId || '1'),
        },
    })

    const updateStateAfterRefetch = async () => {
        const { data: updatedData } = await refetch()

        if (updatedData) {
            setTask(updatedData.task)
        }
    }

    const [submitTask] = useMutation(CREATE_TASK_PARTICIPANT, {
        onCompleted: () => {
            updateStateAfterRefetch()
            toast.success('Task submitted successfully', {
                id: 'toastId',
                duration: 5000,
            })
        },
        onError: (error) => {
            const message =
                error.graphQLErrors[0]?.message || 'Failed to upload task'
            toast.error(message, { id: 'toastId', duration: 5000 })
        },
    })

    useEffect(() => {
        if (data) {
            setTask(data.task)
        }
    }, [data])

    const handleSubmit = async () => {
        if (!title || !description || files.length === 0) {
            toast.error('Please fill all the fields')
            return
        }

        setSubmitLoading(true)
        try {
            const uploaded = await Promise.all(files.map(cloudinaryUploadAny))
            await submitTask({
                variables: {
                    createTaskParticipantInput: {
                        title,
                        description,
                        files: uploaded,
                        taskId: parseInt(taskId || '1'),
                        mahalluId: user?.mahalluId || 1,
                    },
                },
            })
        } catch (error) {
            toast.error('Failed to upload files or submit task')
        } finally {
            setSubmitLoading(false)
        }
    }

    const [claimTaskParticipant] = useMutation(CLAIM_TASK_PARTICIPANT, {
        onCompleted: () => {
            updateStateAfterRefetch()
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 5000)
        },
        onError: () => {
            toast.error('Failed to claim task')
        },
    })

    if (loading) return <SubmitTaskSkeleton />

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
                    {error?.message || 'Failed to fetch task'}
                </p>
            </div>
        )
    }

    return (
        <>
            {showConfetti && <Confetti />}
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
                                        backgroundColor:
                                            task?.category?.color ||
                                            'transparent', // Default background color
                                    }}
                                    onMouseEnter={(e) => {
                                        ;(
                                            e.target as HTMLElement
                                        ).style.backgroundColor = 'white'
                                        ;(e.target as HTMLElement).style.color =
                                            task?.category?.color || 'black'
                                        ;(
                                            e.target as HTMLElement
                                        ).style.borderColor =
                                            task?.category?.color ||
                                            'transparent'
                                        ;(
                                            e.target as HTMLElement
                                        ).style.boxShadow =
                                            `0 0 0 1px ${task?.category?.color || 'transparent'}`
                                    }}
                                    onMouseLeave={(e) => {
                                        ;(
                                            e.target as HTMLElement
                                        ).style.backgroundColor =
                                            task?.category?.color ||
                                            'transparent'
                                        ;(e.target as HTMLElement).style.color =
                                            'white'
                                    }}
                                >
                                    {task?.category?.title}
                                </Button>
                                {task?.campaign && (
                                    <Button
                                        className="transition-all duration-500 bg-gray-700 text-xs text-neutral hover:bg-neutral hover:!ring-gray-700 hover:!border-gray-700  hover:text-gray-700 flex gap-2 items-center justify-center"
                                        size="xs"
                                    >
                                        {task?.campaign.title}
                                    </Button>
                                )}
                            </div>
                            <div>
                                {task?.badge && (
                                    <img
                                        src={task?.badge.icon as string}
                                        alt={task?.badge.name as string}
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {task?.title}
                        </h2>
                        <p
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{
                                __html: task?.description as any,
                            }}
                        ></p>
                    </div>
                    <div className="w-full lg:w-1/2 p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                            Upload Your Submission
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Title of the task
                                </label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter the title of your task"
                                    value={
                                        title ||
                                        ((
                                            task?.participants as TaskParticipant[]
                                        )?.[0]?.title as string)
                                    }
                                    onChange={(e: any) =>
                                        setTitle(e.target.value)
                                    }
                                    className="w-full"
                                    disabled={
                                        (
                                            task?.participants as TaskParticipant[]
                                        )?.length > 0
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description
                                </label>
                                <Input
                                    id="description"
                                    textArea={
                                        (
                                            task?.participants as TaskParticipant[]
                                        )?.length > 0
                                            ? false
                                            : true
                                    }
                                    placeholder="Describe your task submission"
                                    value={
                                        description ||
                                        ((
                                            task?.participants as TaskParticipant[]
                                        )?.[0]?.description as string)
                                    }
                                    onChange={(e: any) =>
                                        setDescription(e.target.value)
                                    }
                                    className="w-full min-h-[120px]"
                                    disabled={
                                        (
                                            task?.participants as TaskParticipant[]
                                        )?.length > 0
                                    }
                                />
                            </div>
                            {(task?.participants as TaskParticipant[])?.length >
                            0 ? (
                                /// show images
                                <div className="flex flex-wrap gap-4">
                                    {(
                                        task?.participants as TaskParticipant[]
                                    )?.[0].files?.map((file) => (
                                        <Card
                                            className="h-20 w-20 flex items-center justify-center cursor-pointer"
                                            onClick={() =>
                                                window.open(file, '_blank')
                                            }
                                        >
                                            <HiDocument className="w-8 h-8" />
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Upload your documents
                                    </label>
                                    <Upload
                                        draggable
                                        multiple
                                        onChange={(files) =>
                                            setFiles(files as File[])
                                        }
                                    />
                                </div>
                            )}
                            {Array.isArray(task?.participants) &&
                            task.participants.length > 0 ? (
                                // Check the first participant's status
                                (() => {
                                    const participant = task.participants[0]
                                    if (participant) {
                                        // Pending Button
                                        if (
                                            !participant.verified &&
                                            !participant.claimed
                                        ) {
                                            return (
                                                <Button className="w-full">
                                                    Pending
                                                </Button>
                                            )
                                        }

                                        // Claim Button
                                        if (!participant.claimed) {
                                            return (
                                                <Button
                                                    onClick={() => {
                                                        setClaimLoading(true)
                                                        claimTaskParticipant({
                                                            variables: {
                                                                id: participant.id,
                                                            },
                                                        }).finally(() =>
                                                            setClaimLoading(
                                                                false,
                                                            ),
                                                        )
                                                    }}
                                                    className="w-full"
                                                    variant="solid"
                                                    loading={claimLoading}
                                                >
                                                    {claimLoading
                                                        ? 'Claiming...'
                                                        : 'Claim'}
                                                </Button>
                                            )
                                        }

                                        // Claimed Button
                                        if (participant.claimed) {
                                            return (
                                                <Button
                                                    disabled
                                                    className="w-full"
                                                    variant="solid"
                                                >
                                                    Claimed
                                                </Button>
                                            )
                                        }
                                    }
                                    return null // Fallback if no participant matches the conditions
                                })()
                            ) : (
                                // Submit Button for tasks without participants
                                <Button
                                    className="w-full"
                                    onClick={handleSubmit}
                                    loading={submitLoading}
                                    disabled={submitLoading}
                                    variant="solid"
                                >
                                    Submit Task
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmitTask
