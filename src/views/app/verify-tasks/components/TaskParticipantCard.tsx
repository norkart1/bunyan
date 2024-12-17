import { Badge, Button, Card } from '@/components/ui'
import { Badge as BadgeType, Campaign, TaskParticipant } from '@/generated/graphql'
import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import clsx from 'clsx'
import { timeAgo } from '@/utils/dateHelper'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CgEye } from 'react-icons/cg'

interface TaskParticipantCardProps {
    // title: string
    // description: string
    // date: string
    // category: string
    // badge?: BadgeType
    // campaign?: Campaign
    // claimed?: boolean
    // verified?: boolean
    // remarks?: string
    // pending?: boolean
    taskParticipant: TaskParticipant
}

const TaskParticipantCard = ({ taskParticipant }: TaskParticipantCardProps) => {
    const navigate = useNavigate()
    return (
        <div className="w-full md:w-[45%]  lg:w-[30%]">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out"
                onClick={(e) => console.log('Card Clickable', e)}
            >
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
                <div className="flex">
                    <h5>{taskParticipant?.task?.title}</h5>
                </div>
                <p className="mt-2">
                    {taskParticipant?.task?.description?.substring(0, 38)}...
                </p>
                <div className="flex gap-4 mt-2 justify-between items-center">
                    <p>{taskParticipant?.mahallu?.name}</p>
                    <div className="flex gap-2">
                        {
                            taskParticipant?.verified ? (
                                <>
                                    <Button
                                        disabled
                                        className="font-medium cursor-not-allowed"
                                        size="xs"
                                        variant="solid"
                                    >
                                        Verified
                                    </Button>
                                    <CgEye
                                        className={`self-center cursor-pointer`}
                                        size={20}
                                        onClick={() => navigate(`/verify-task/${taskParticipant.id}`)}
                                    />
                                </>
                            ) : (
                                <Button
                                    variant="solid"
                                    size='xs'
                                    onClick={() => navigate(`/verify-task/${taskParticipant.id}`)}
                                >
                                    Verify
                                </Button>
                            )
                        }
                    </div>

                </div>
            </Card>
        </div>
    )
}

export default TaskParticipantCard
