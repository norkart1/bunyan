import ViewModal from '@/components/dynamic/ViewModal'
import { Button, Card, Tag } from '@/components/ui'
import { Task, LocationTypeEnum } from '@/generated/graphql'
import { FIND_ALL_TASKS } from '@/graphql/queries/task'
import classNames from '@/utils/classNames'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import isLastChild from '@/utils/isLastChild'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { PiCheckFatDuotone, PiSuitcase } from 'react-icons/pi'
import { TbArticle } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const TasksCards = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [viewOpen, setViewOpen] = useState(false);
    const [toView, setToView] = useState<Task | null>(null);
    const navigate = useNavigate();
    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_TASKS, {
        variables: {
            limit: 3,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setTasks(findAllData.tasks);
        }
    }, [findAllData]);
    return (
        <>
            {viewOpen && toView && (
                <ViewModal
                    isOpen={viewOpen}
                    setIsOpen={setViewOpen}
                    title="Task Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <h2>{toView.title}</h2>
                            </div>
                            <div className="flex justify-between items-center">
                                <span dangerouslySetInnerHTML={{
                                    __html: toView?.description as any,
                                }}>{ }</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Year:</span>
                                <span>{toView.year?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Badge:</span>
                                <span>{toView.badge?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Category:</span>
                                <span>{toView.category?.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Campaign:</span>
                                <span>{toView.campaign?.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Points:</span>
                                <span>{toView.points}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Start Date:</span>
                                <span>{convertToYYYYMMDD(toView.startDate)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Due Date:</span>
                                <span>{convertToYYYYMMDD(toView.dueDate)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Active:</span>
                                <Tag className={toView.active ? 'bg-green-400' : 'bg-red-400'}>
                                    {toView.active ? 'Active' : 'Inactive'}
                                </Tag>                              </div>
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
            <Card className="w-full md:w-1/3 border border-gray-400">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="w-20 h-20 bg-[#CDDBFF] rounded-full flex items-center justify-center">
                            <PiCheckFatDuotone className="w-10 h-10 text-gray-700" />
                        </div>
                        <h4 className="text-2xl">Tasks</h4>
                    </div>
                    <Button size="sm" onClick={
                        () => navigate('/task')
                    }>View all</Button>
                </div>
                <div className="mt-5">
                    {
                        findAllLoading ? (<div>
                            {Array.from({ length: 3 }).map((_, index) => ( // Adjust the number for the desired skeleton rows
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
                        ) : tasks.length > 0 ? (
                            <>
                                {tasks?.map((task, index) => (
                                    <div
                                        key={task.id}
                                        className={classNames(
                                            'flex items-center justify-between py-2 dark:border-gray-600',
                                            !isLastChild(tasks, index) && 'mb-2',
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="heading-text font-bold">
                                                {task.title}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-full cursor-pointer">
                                            <FaEye onClick={
                                                () => {
                                                    setToView(task);
                                                    setViewOpen(true);
                                                }
                                            } />
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (<div className="w-full text-center text-gray-500">No Tasks found</div>)
                    }

                </div>
            </Card>
        </>
    )
}

export default TasksCards
