import { Badge, Button, Card } from '@/components/ui'
import { Badge as BadgeType, Campaign, Task } from '@/generated/graphql'
import React, { useState } from 'react'
import { FaCalendarAlt, FaEye } from 'react-icons/fa'
import clsx from 'clsx'
import { timeAgo } from '@/utils/dateHelper'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'
import { CLAIM_TASK_PARTICIPANT } from '@/graphql/mutations/task-participant'
import { useMutation } from '@apollo/client'
import { BsEye } from 'react-icons/bs'
import { CgEye } from 'react-icons/cg'

interface TaskCardProps {
    updateState: any
    task: Task
}

const TaskCard = ({ task, updateState }: TaskCardProps) => {
    const navigate = useNavigate()
    const [showConfetti, setShowConfetti] = useState(false)
    const [claimLoading, setClaimLoading] = useState(false)

    const [claimTaskParticipant] = useMutation(CLAIM_TASK_PARTICIPANT, {
        onCompleted: () => {
            updateState()
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 5000)
        },
        onError: () => {
            toast.error('Failed to claim task')
        },
    })
    return (
        <>
            {showConfetti && <Confetti />}

            <div className="w-full md:w-[45%]  lg:w-[30%]">
                <Card
                    clickable
                    className=""
                >
                    <div className="flex justify-between">
                        <div className="flex gap-1 items-start">
                            <Button
                                className="text-xs mb-2"
                                size="xs"
                                style={{
                                    color: 'white', // Default text color
                                    backgroundColor: `${task.category?.color || 'transparent'}cc`, // Default background color
                                    // background opacity to 0.2
                                }}
                                onMouseEnter={(e) => {
                                    ;(
                                        e.target as HTMLElement
                                    ).style.backgroundColor = 'white'
                                    ;(e.target as HTMLElement).style.color =
                                        task.category?.color || 'black'
                                    ;(
                                        e.target as HTMLElement
                                    ).style.borderColor =
                                        `${task.category?.color || 'transparent'}cc`
                                    ;(e.target as HTMLElement).style.boxShadow =
                                        `0 0 0 1px ${task.category?.color || 'transparent'}`
                                }}
                                onMouseLeave={(e) => {
                                    ;(
                                        e.target as HTMLElement
                                    ).style.backgroundColor =
                                        `${task.category?.color || 'transparent'}cc`
                                    ;(e.target as HTMLElement).style.color =
                                        'white'
                                }}
                            >
                                {task.category?.title}
                            </Button>
                            {task.campaign && (
                                <Button
                                    className="transition-all duration-500 bg-gray-700 text-xs text-neutral hover:bg-neutral hover:!ring-gray-700 hover:!border-gray-700  hover:text-gray-700 flex gap-2 items-center justify-center"
                                    size="xs"
                                >
                                    {task.campaign.title}
                                </Button>
                            )}
                        </div>
                        <div>
                            {task.badge &&  (
                                <img
                                    src={task.badge.icon as string}
                                    alt={task.badge.name as string}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <h6>{task.title?.substring(0, 30)}</h6>
                    </div>
                    {/* <p className="mt-2">
                        {task.description?.substring(0, 38)}...
                    </p> */}
                    <div className="flex gap-4 mt-2 justify-between items-center">
                        <div className="flex gap-2">
                            <p>expires {timeAgo(task.dueDate)}</p>
                        </div>
                        <div className="flex gap-2">
                            {Array.isArray(task.participants) &&
                            task.participants.length > 0 ? (
                                <>
                                    {/* Extract the first participant for readability */}
                                    {(() => {
                                        const participant = task.participants[0]

                                        if (participant) {
                                            // Pending Button
                                            if (
                                                !participant.verified &&
                                                !participant.claimed
                                            ) {
                                                return (
                                                    <Button
                                                        className="text-sm"
                                                        size="xs"
                                                        variant="plain"
                                                    >
                                                        Pending
                                                    </Button>
                                                )
                                            }

                                            // Claim Button
                                            if (!participant.claimed) {
                                                return (
                                                    <Button
                                                        onClick={() => {
                                                            setClaimLoading(
                                                                true,
                                                            )
                                                            claimTaskParticipant(
                                                                {
                                                                    variables: {
                                                                        id: participant.id,
                                                                    },
                                                                },
                                                            ).finally(() =>
                                                                setClaimLoading(
                                                                    false,
                                                                ),
                                                            )
                                                        }}
                                                        className="text-sm"
                                                        size="xs"
                                                        variant="solid"
                                                        loading={claimLoading}
                                                    >
                                                        {claimLoading
                                                            ? 'Claiming'
                                                            : 'Claim'}
                                                    </Button>
                                                )
                                            }

                                            // Claimed Button
                                            if (participant.claimed) {
                                                return (
                                                    <Button
                                                        disabled
                                                        className="font-medium cursor-not-allowed"
                                                        size="xs"
                                                        variant="solid"
                                                    >
                                                        Claimed
                                                    </Button>
                                                )
                                            }
                                        }

                                        return null // Fallback to null if no valid participant condition
                                    })()}
                                    <CgEye
                                        className={`self-center cursor-pointer`}
                                        size={20}
                                        onClick={() =>
                                            navigate(`/submit-task/${task.id}`)
                                        }
                                    />
                                </>
                            ) : (
                                // Submit Button
                                <Button
                                    onClick={() =>
                                        navigate(`/submit-task/${task.id}`)
                                    }
                                    className="text-sm"
                                    size="xs"
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default TaskCard
