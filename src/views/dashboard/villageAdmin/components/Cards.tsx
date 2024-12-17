import { Button, Card } from '@/components/ui'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import { BsCalendarEvent } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'
import { PiSuitcase } from 'react-icons/pi'
import { TbArticle } from 'react-icons/tb'

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

    return (
        <div className="flex gap-2 flex-col md:flex-row mt-4">
            <Card className="w-full md:w-1/3 border border-gray-400">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="w-20 h-20 bg-[#FFF7CD] rounded-full flex items-center justify-center">
                            <PiSuitcase className="w-10 h-10 text-gray-700" />
                        </div>
                        <h4 className="text-2xl">Jobs</h4>
                    </div>
                    <Button size="sm">View all</Button>
                </div>
                <div className="mt-5">
                    {data.map((product, index) => (
                        <div
                            key={product.id}
                            className={classNames(
                                'flex items-center justify-between py-2 dark:border-gray-600',
                                !isLastChild(data, index) && 'mb-2',
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="heading-text font-bold">
                                        {product.name}
                                    </div>
                                    <div className="text-xs font-light">
                                        Hosted By: {product.sales}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-full cursor-pointer">
                                <FaEye />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="w-full md:w-1/3 border border-gray-400">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="w-20 h-20 bg-[#CDDBFF] rounded-full flex items-center justify-center">
                            <BsCalendarEvent className="w-10 h-10 text-gray-700" />
                        </div>
                        <h4 className="text-2xl">Events</h4>
                    </div>
                    <Button size="sm">View all</Button>
                </div>
                <div className="mt-5">
                    {data.map((product, index) => (
                        <div
                            key={product.id}
                            className={classNames(
                                'flex items-center justify-between py-2 dark:border-gray-600',
                                !isLastChild(data, index) && 'mb-2',
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="heading-text font-bold">
                                        {product.name}
                                    </div>
                                    <div className="text-xs font-light">
                                        Hosted By: {product.sales}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-full cursor-pointer">
                                <FaEye />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="w-full md:w-1/3 border border-gray-400">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="w-20 h-20 bg-[#E7FFCD] rounded-full flex items-center justify-center">
                            <TbArticle className="w-10 h-10 text-gray-700" />
                        </div>
                        <h4 className="text-2xl">Posts</h4>
                    </div>
                    <Button size="sm">View all</Button>
                </div>
                <div className="mt-5">
                    {data.map((product, index) => (
                        <div
                            key={product.id}
                            className={classNames(
                                'flex items-center justify-between py-2 dark:border-gray-600',
                                !isLastChild(data, index) && 'mb-2',
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="heading-text font-bold">
                                        {product.name}
                                    </div>
                                    <div className="text-xs font-light">
                                        Hosted By: {product.sales}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-full cursor-pointer">
                                <FaEye />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default DashboardCards
