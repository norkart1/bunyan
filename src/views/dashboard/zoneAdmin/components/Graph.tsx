import { Card, Select } from '@/components/ui'
import React from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const DashboardGraph = () => {

    

    const villageData = {
        2023: [
            {
                name: 'Jan',
                points: 4000,
            },
            {
                name: 'Feb',
                points: 3000,
            },
            {
                name: 'Mar',
                points: 2000,
            },
            {
                name: 'Apr',
                points: 2780,
            },
            {
                name: 'May',
                points: 1890,
            },
            {
                name: 'Jun',
                points: 2390,
            },
            {
                name: 'Jul',
                points: 3490,
            },
            {
                name: 'Aug',
                points: 3490,
            },
            {
                name: 'Sep',
                points: 3490,
            },
            {
                name: 'Oct',
                points: 3490,
            },
            {
                name: 'Nov',
                points: 3490,
            },
            {
                name: 'Dec',
                points: 3490,
            },
        ],
        2024: [
            {
                name: 'Jan',
                points: 1200,
            },
            {
                name: 'Feb',
                points: 3000,
            },
            {
                name: 'Mar',
                points: 350,
            },
            {
                name: 'Apr',
                points: 2780,
            },
            {
                name: 'May',
                points: 120,
            },
            {
                name: 'Jun',
                points: 2390,
            },
            {
                name: 'Jul',
                points: 3490,
            },
            {
                name: 'Aug',
                points: 1230,
            },
            {
                name: 'Sep',
                points: 3490,
            },
            {
                name: 'Oct',
                points: 340,
            },
            {
                name: 'Nov',
                points: 3490,
            },
            {
                name: 'Dec',
                points: 4002,
            },
        ],
    }

    const [selectedYear, setSelectedYear] = React.useState('2024')

    const handleYearChange = (selectedOption: any) => {
        setSelectedYear(selectedOption.value)
    }

    return (
        <Card className="overflow-hidden border border-gray-400 my-4">
            <div>
                <div className="flex items-center justify-between mb-6 p-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Villages Performance
                        </h2>
                        <p className="text-sm text-gray-600">
                            Points achieved by each village
                        </p>
                    </div>

                    <Select
                        value={{
                            value: selectedYear,
                            label: selectedYear,
                        }}
                        onChange={handleYearChange}
                        options={Object.keys(villageData).map((year) => ({
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
                                villageData[
                                    selectedYear as unknown as keyof typeof villageData
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
        </Card>
    )
}

export default DashboardGraph
