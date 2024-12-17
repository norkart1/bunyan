import ViewModal from '@/components/dynamic/ViewModal'
import { Button, Card, Tag } from '@/components/ui'
import { Job, LocationTypeEnum } from '@/generated/graphql'
import { FIND_ALL_JOBS } from '@/graphql/queries/job'
import classNames from '@/utils/classNames'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import isLastChild from '@/utils/isLastChild'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { PiSuitcase } from 'react-icons/pi'
import { TbArticle } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const JobsCards = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [viewOpen, setViewOpen] = useState(false);
    const [toView, setToView] = useState<Job | null>(null);
    const navigate = useNavigate();
    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_JOBS, {
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
            setJobs(findAllData.jobs);
        }
    }, [findAllData]);
    return (
        <>
            {viewOpen && toView && (
                <ViewModal
                    isOpen={viewOpen}
                    setIsOpen={setViewOpen}
                    title="Job Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Title:</span>
                                <span>{toView.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Description:</span>
                                <span>{toView.description}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Employment Type:</span>
                                <span>{toView.employmentType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Location Type:</span>
                                <span>{toView.locationType}</span>
                            </div>
                            {
                                toView.locationType !== LocationTypeEnum.Remote && (
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Location:</span>
                                        <span>{toView.location}</span>
                                    </div>
                                )
                            }
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Salary Range:</span>
                                <span>{toView.salaryRange}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Skills:</span>
                                <span>{toView.skills}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Expiration Date:</span>
                                <span>{convertToYYYYMMDD(toView.expirationDate)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Active:</span>
                                <Tag className={toView.active ? 'bg-green-400' : 'bg-red-400'}>
                                    {toView.active ? 'Active' : 'Inactive'}
                                </Tag>
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
            <Card className="w-full md:w-1/3 border border-gray-400">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="w-20 h-20 bg-[#E7FFCD] rounded-full flex items-center justify-center">
                            <PiSuitcase className="w-10 h-10 text-gray-700" />
                        </div>
                        <h4 className="text-2xl">Jobs</h4>
                    </div>
                    <Button size="sm" onClick={
                        () => navigate('/job')
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
                        ) : jobs.length > 0 ? (
                            <>
                                {jobs?.map((job, index) => (
                                    <div
                                        key={job.id}
                                        className={classNames(
                                            'flex items-center justify-between py-2 dark:border-gray-600',
                                            !isLastChild(jobs, index) && 'mb-2',
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <div className="heading-text font-bold">
                                                    {job.title}
                                                </div>
                                                <div className="text-xs font-light">
                                                    {job.description}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-full cursor-pointer">
                                            <FaEye onClick={
                                                () => {
                                                    setToView(job);
                                                    setViewOpen(true);
                                                }
                                            } />
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (<div className="w-full text-center text-gray-500">No Jobs found</div>)
                    }

                </div>
            </Card>
        </>
    )
}

export default JobsCards
