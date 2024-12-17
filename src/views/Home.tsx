import RowSelection from '@/components/dynamic/Table'
import { Chart, GrowShrinkValue } from '@/components/shared'
import { Avatar, Button, Card, Select } from '@/components/ui'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import { useMemo, useState } from 'react'
import { BsCalendarEvent, BsCalendarEventFill } from 'react-icons/bs'
import { FaEye, FaSuitcase, FaSuitcaseRolling } from 'react-icons/fa'
import { FaMosque } from 'react-icons/fa6'
import { PiSuitcase } from 'react-icons/pi'
import { TbArticle, TbArticleFilled } from 'react-icons/tb'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const zoneData = {
    2021: [
        { name: 'Zone A', points: 85 },
        { name: 'Zone B', points: 72 },
        { name: 'Zone C', points: 93 },
        { name: 'Zone D', points: 68 },
        { name: 'Zone E', points: 79 },
    ],
    2022: [
        { name: 'Zone A', points: 88 },
        { name: 'Zone B', points: 76 },
        { name: 'Zone C', points: 91 },
        { name: 'Zone D', points: 72 },
        { name: 'Zone E', points: 83 },
    ],
    2023: [
        { name: 'Zone A', points: 92 },
        { name: 'Zone B', points: 79 },
        { name: 'Zone C', points: 95 },
        { name: 'Zone D', points: 75 },
        { name: 'Zone E', points: 87 },
    ],
}

const data = [
    {
        id: 1,
        img: '/img/avatars/thumb-1.jpg',
        name: 'Product 1',
        sales: 100,
        growShrink: 10,
    },
    {
        id: 2,
        img: '/img/avatars/thumb-2.jpg',
        name: 'Product 2',
        sales: 200,
        growShrink: -10,
    },
    {
        id: 2,
        img: '/img/avatars/thumb-2.jpg',
        name: 'Product 2',
        sales: 200,
        growShrink: -10,
    },
]

const Home = () => {
    const [selectedYear, setSelectedYear] = useState('2023')

    const handleYearChange = (selectedOption: any) => {
        setSelectedYear(selectedOption.value)
    }
    return (
        <div>
            {/* head bar */}
            <div className="w-full relative bg-neutral rounded-3xl grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-4 sm:grid-cols-1 sm:grid-rows-4 gap-4 border border-gray-400">
                {/* Card 1 */}
                <div className="relative pt-8 pb-4 md:py-6 px-8">
                    <p className="text-md">Assalamu Alaikum,</p>
                    <p className="text-2xl text-gray-950">
                        Hi Kozhikode District Admin
                    </p>
                </div>

                {/* Card 2 */}
                <div className="relative py-6 px-4 flex gap-4">
                    <div className="rounded-full bg-[#E7FFCD] w-20 h-20 items-center justify-center flex">
                        <img src="/img/icons/mosque.png" alt="profile" />
                    </div>
                    <div className="flex items-start justify-center flex-col">
                        <p className="text-xs">Total Mahallus</p>
                        <p className="text-3xl text-gray-950 font-medium">
                            25345
                        </p>
                    </div>
                    {/* Vertical line */}
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-400 lg:block md:block hidden"></div>
                </div>

                {/* Card 3 */}
                <div className="relative py-6 px-4 flex gap-4">
                    <div className="rounded-full bg-[#FFF7CD] w-20 h-20 items-center justify-center flex">
                        <img src="/img/icons/mosque.png" alt="profile" />
                    </div>
                    <div className="flex items-start justify-center flex-col">
                        <p className="text-xs">Total Mahallus</p>
                        <p className="text-3xl text-gray-950 font-medium">
                            25345
                        </p>
                    </div>
                    {/* Vertical line */}
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-400 lg:block md:block hidden"></div>
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-400 block md:hidden"></div>
                </div>

                {/* Card 4 */}
                <div className="relative py-6 px-4 flex gap-4">
                    <div className="rounded-full bg-[#CDDBFF] w-20 h-20 items-center justify-center flex">
                        <img src="/img/icons/mosque.png" alt="profile" />
                    </div>
                    <div className="flex items-start justify-center flex-col">
                        <p className="text-xs">Total Mahallus</p>
                        <p className="text-3xl text-gray-950 font-medium">
                            25345
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-400 block md:hidden"></div>
                </div>
            </div>

            {/* graph */}
            <div className="w-full  bg-white  rounded-3xl overflow-hidden border border-gray-400 my-4">
                <div>
                    <div className="flex items-center justify-between mb-6 p-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                District Zones Performance
                            </h2>
                            <p className="text-sm text-gray-600">
                                Points achieved by each zone
                            </p>
                        </div>

                        <Select
                            value={{
                                value: selectedYear,
                                label: selectedYear,
                            }}
                            onChange={handleYearChange}
                            options={Object.keys(zoneData).map((year) => ({
                                value: year,
                                label: year,
                            }))}
                            className="w-40"
                            isSearchable={true}
                        />
                    </div>
                    <div className="h-[300px] ">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={
                                    zoneData[
                                        selectedYear as unknown as keyof typeof zoneData
                                    ]
                                }
                                margin={{
                                    top: 5,
                                    right: 40,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={10}
                                />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="points"
                                    stroke="#0CAF60"
                                    strokeWidth={2}
                                    dot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* cards */}

            <div className="flex gap-2 flex-col md:flex-row">
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

            {/* Ranking */}

            {/* <RowSelection
                            name="district"
                            data={[
                                {
                                    id: 1,
                                    name: 'Kozhikode',
                                    zone: 'A',
                                    mahalluCount: 100,
                                },
                                {
                                    id: 2,
                                    name: 'Malappuram',
                                    zone: 'B',
                                    mahalluCount: 200,
                                },
                                {
                                    id: 3,
                                    name: 'Wayanad',
                                    zone: 'C',
                                    mahalluCount: 300,
                                },
                                {
                                    id: 4,
                                    name: 'Kannur',
                                    zone: 'D',
                                    mahalluCount: 400,
                                },
                                {
                                    id: 5,
                                    name: 'Kasaragod',
                                    zone: 'E',
                                    mahalluCount: 500,
                                },
                            ]}
                            dataCount={5}
                            pageSize={}
                            setPageSize={setPageSize}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            setRowSelection={setRowSelection}
                            sorting={sorting}
                            setSorting={setSorting}
                            deleteMany={handleDeleteMany}
                            actionButtons={(row: Row<District>) => (
                                <div className="flex items-center gap-3">
                                    <Tooltip title="View">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToView(row.original)
                                                setIsViewOpen(true)
                                            }}
                                        >
                                            <TbEye />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToUpdate(row.original)
                                                setIsUpdateOpen(true)
                                            }}
                                        >
                                            <TbPencil />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToDelete(row.original)
                                                setIsDeleteOpen(true)
                                            }}
                                        >
                                            <TbTrash />
                                        </div>
                                    </Tooltip>
                                </div>
                            )}
                        /> */}
        </div>
    )
}

export default Home
