import { NotificationIcon } from '@/components/icons/Icons'
import { GrowShrinkValue } from '@/components/shared'
import { Avatar, Button, Card, Skeleton } from '@/components/ui'
import { TaskParticipant } from '@/generated/graphql'
import { GET_MY_PARTICIPANTS } from '@/graphql/queries/task-participant'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import ProfileAvatar from '@/views/app/mail/Mail/components/ProfileAvatar'
import { useQuery } from '@apollo/client'
import React from 'react'
import { PiNotificationFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

const Notification = () => {

    const navigate = useNavigate()

    const { data, loading, error } = useQuery(GET_MY_PARTICIPANTS, {
        variables: {
            limit: 5,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {},
        },
    })


    return (
        <Card className='w-full md:w-1/3 border border-gray-400'>
            <div className="flex items-center justify-between ">

                <div className='flex gap-2 m-1'>
                    <NotificationIcon className='w-6 h-6 text-error' />
                    <h4 className=''>Notifications</h4>
                </div>
                {/* <Button size="sm" >
            View all
        </Button> */}
            </div>
            <hr className='mt-2 border border-gray-200' />
            <div className="mt-5">
                {loading ? (
                    <div>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-2 mb-2 dark:border-gray-600"
                            >
                                <div className="flex items-center gap-2">
                                    {/* Index placeholder */}
                                    <Skeleton width={20} height={20} />

                                    {/* Profile Avatar Skeleton */}
                                    <Skeleton
                                        height={40}
                                        width={40}
                                        className="bg-gray-200"
                                    />

                                    {/* Name Placeholder */}
                                    <div>
                                        <Skeleton width={150} height={20} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Button Placeholder */}
                                    <Skeleton width={100} height={30} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : data.getFromTaskParticipationOnMyVillage?.length > 0 ? data.getFromTaskParticipationOnMyVillage?.map((taskParticipant: TaskParticipant, index: number) => (
                    <div
                        key={index}
                        className={classNames(
                            'flex items-center justify-between py-2 dark:border-gray-600',
                            !isLastChild(data, index) && 'mb-2',
                        )}
                    >
                        <div className="flex items-center gap-2">

                            <p className="font-semibold text-gray-950">#
                                {index + 1}
                            </p>

                            <ProfileAvatar
                                className="bg-white"
                                src={taskParticipant?.mahallu?.name || ''}
                                alt={taskParticipant?.mahallu?.name || ''}
                            />
                            <div>
                                <div className="heading-text">
                                    {taskParticipant?.mahallu?.name}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* check now button */}
                            <Button
                                onClick={() => navigate(`/verify-task/${taskParticipant.id}`)}
                                size="sm" variant='plain' className='underline text-error'>
                                Verify now
                            </Button>
                        </div>
                    </div>
                )) : error ? (
                    <div className="flex items-center justify-center">
                        <p className="text-gray-500">{error?.message}</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <p className="text-gray-500">No notifications</p>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default Notification