import { Button, Card } from '@/components/ui'
import { Fatwa } from '@/generated/graphql'
import { FIND_ALL_FATWAS } from '@/graphql/queries/fatwa'
import classNames from '@/utils/classNames'
import { timeAgo } from '@/utils/dateHelper'
import isLastChild from '@/utils/isLastChild'
import { useQuery } from '@apollo/client'
import { BsCalendarEvent } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'
import { LuMessageSquareDashed } from 'react-icons/lu'
import { PiSuitcase } from 'react-icons/pi'
import { TbArticle } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import CardSkeleton from './CardSkeleton'

const DashboardCards = () => {
    const data = [
        {
            id: 1,
            name: 'Event 1',
            sales: 'Admin 1',
        },
        {
            id: 2,
            name: 'Event 2',
            sales: 'Admin 2',
        },
        {
            id: 3,
            name: 'Event 3',
            sales: 'Admin 3',
        },
    ]

    const navigate = useNavigate()

    const {
        data: AnsweredFatwas,
        error: AnsweredFatwasError,
        loading: AnsweredFatwasLoading,
    } = useQuery(FIND_ALL_FATWAS, {
        variables: {
            limit: 5,
            offset: 0,
            orderBy: {}, // Adjust as needed
            relationsToFilter: {}, // Adjust as needed
            filters: {
                status: 'ANSWERED', // Ensure it matches Prisma's expectations
            },
        },
    })

    const {
        data: PendingFatwas,
        error: PendingFatwasError,
        loading: PendingFatwasLoading,
    } = useQuery(FIND_ALL_FATWAS, {
        variables: {
            limit: 5,
            offset: 0,
            orderBy: {}, // Adjust as needed
            relationsToFilter: {}, // Adjust as needed
            filters: {
                status: 'PENDING', // Ensure it matches Prisma's expectations
            },
        },
    })

    return (
        <div className="flex gap-2 flex-col md:flex-row mt-4">
            {
                AnsweredFatwasLoading && (
                    <CardSkeleton />
                )
            }

            {
                PendingFatwasLoading && (
                    <CardSkeleton />
                )
            }

            {
                AnsweredFatwas && (
                    <Card className="w-full md:w-1/2 border border-gray-400">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="w-20 h-20 bg-[#FFF7CD] rounded-full flex items-center justify-center">
                            <LuMessageSquareDashed className="w-10 h-10 text-gray-700" />
                        </div>
                        <h4 className="text-2xl">Answered</h4>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => navigate('/answer-fatwa')}
                    >
                        View all
                    </Button>
                </div>
                <div className="mt-5">
                    {AnsweredFatwas?.fatwas?.map(
                        (fatwa: Fatwa, index: number) => (
                            <div
                                key={index}
                                className={classNames(
                                    'flex items-center justify-between py-2 dark:border-gray-600',
                                    !isLastChild(data, index) && 'mb-2',
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="heading-text font-bold">
                                            {fatwa.question
                                                ?.substring(0, 50)
                                                .concat('...')}
                                        </div>
                                        <div className="text-xs font-light">
                                            Answered By:{' '}
                                            {fatwa.answeredBy?.username}
                                        </div>
                                    </div>
                                </div>
                                <div
                                onClick={() => navigate('/answer-fatwa/' + fatwa.id)}
                                 className="flex items-center gap-2 p-2 bg-gray-100 rounded-full cursor-pointer">
                                    <FaEye />
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </Card>
                )
            }

            {
                PendingFatwas && (
                    <Card className="w-full md:w-1/2 border border-gray-400">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="w-20 h-20 bg-[#CDDBFF] rounded-full flex items-center justify-center">
                            <BsCalendarEvent className="w-10 h-10 text-gray-700" />
                        </div>
                        <h4 className="text-2xl">Pending</h4>
                    </div>
                    <Button 
                    onClick={() => navigate('/answer-fatwa')}
                    size="sm">View all</Button>
                </div>
                <div className="mt-5">
                    {PendingFatwas?.fatwas?.map(
                        (fatwa: Fatwa, index: number) => (
                            <div
                                key={index}
                                className={classNames(
                                    'flex items-center justify-between py-2 dark:border-gray-600',
                                    !isLastChild(data, index) && 'mb-2',
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="heading-text font-bold">
                                            {fatwa.question
                                                ?.substring(0, 50)
                                                .concat('...')}
                                        </div>
                                        <div className="text-xs font-light">
                                            Asked At :{' '}
                                            {timeAgo(fatwa.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                <div
                                onClick={() => navigate('/answer-fatwa/' + fatwa.id)}
                                className="flex items-center gap-2 p-2 bg-gray-100 rounded-full cursor-pointer">
                                    <FaEye />
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </Card>
                )
            }
        </div>
    )
}

export default DashboardCards
