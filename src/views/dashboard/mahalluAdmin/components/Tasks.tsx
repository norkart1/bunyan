import ViewModal from '@/components/dynamic/ViewModal'
import { Button, Card, Tag } from '@/components/ui'
import { TaskParticipant, LocationTypeEnum } from '@/generated/graphql'
import { FIND_ALL_TASK_PARTICIPANTS } from '@/graphql/queries/task-participant'
import classNames from '@/utils/classNames'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import isLastChild from '@/utils/isLastChild'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { PiCheckFatDuotone, PiSuitcase } from 'react-icons/pi'
import { TbArticle } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const TaskParticipantsCards = () => {
    const [taskParticipants, setTaskParticipants] = useState<TaskParticipant[]>([]);
    const [viewOpen, setViewOpen] = useState(false);
    const [toView, setToView] = useState<TaskParticipant | null>(null);
    const navigate = useNavigate();
    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_TASK_PARTICIPANTS, {
        variables: {
            limit: 5,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setTaskParticipants(findAllData.taskParticipants);
        }
    }, [findAllData]);
    return (
        <>
            {viewOpen && toView && (
                <ViewModal
                    isOpen={viewOpen}
                    setIsOpen={setViewOpen}
                    title="TaskParticipant Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Title:</span>
                                <span>{toView.title}</span>
                            </div>
                            
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
            <Card className="w-full border border-gray-400 min-h-[28rem]">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="w-20 h-20 bg-[#FFF7CD] rounded-full flex items-center justify-center">
                            <PiCheckFatDuotone className="w-10 h-10 text-gray-700" />
                        </div>
                        <h4 className="text-2xl">TaskParticipants</h4>
                    </div>
                    <Button size="sm" onClick={
                        () => navigate('/view-tasks')
                    }>View all</Button>
                </div>
                <div className="mt-5">
                    {
                        findAllLoading ? (<div>
                            {Array.from({ length: 5 }).map((_, index) => ( // Adjust the number for the desired skeleton rows
                                <div
                                    key={index}
                                    className={classNames(
                                        'flex items-center justify-between py-2 dark:border-gray-600 animate-pulse',
                                        index < 4 && 'mb-2', // Add margin except for the last skeleton row
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <div className="h-5 w-32 bg-gray-300 rounded"></div> {/* Placeholder for title */}
                                            <div className="h-4 w-24 bg-gray-300 rounded mt-1"></div> {/* Placeholder for description */}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-full cursor-default">
                                        <div className="h-4 w-4 bg-gray-300 rounded-full"></div> {/* Placeholder for the icon */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        ) : findAllError ? (
                            <div className="w-full text-center text-gray-500">{findAllError?.message}</div>
                        ) : taskParticipants.length > 0 ? (
                            <>
                                {taskParticipants?.map((taskParticipant, index) => (
                                    <div
                                        key={taskParticipant.id}
                                        className={classNames(
                                            'flex items-center justify-between py-2 dark:border-gray-600',
                                            !isLastChild(taskParticipants, index) && 'mb-2',
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <div className="heading-text font-bold">
                                                    {taskParticipant.title}
                                                </div>
                                                <div className="text-xs font-light">
                                                    {taskParticipant.description}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-full cursor-pointer">
                                            <FaEye onClick={
                                                () => {
                                                    setToView(taskParticipant);
                                                    setViewOpen(true);
                                                }
                                            } />
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (<div className="w-full text-center text-gray-500">No TaskParticipants found</div>)
                    }

                </div>
            </Card>
        </>
    )
}

export default TaskParticipantsCards
