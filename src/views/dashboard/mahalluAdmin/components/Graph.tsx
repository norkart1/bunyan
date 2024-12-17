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

const MultiLineGraph = () => {
    const multiLineData = {
        2023: [
            {
                name: 'Jan',
                General: 4000,
                Resources: 2400,
                Services: 1200,
                Financial: 800,
                Spiritual: 899,
                Educational: 899,
            },
            {
                name: 'Feb',
                General: 3000,
                Resources: 1398,
                Services: 2200,
                Financial: 1800,
                Spiritual: 800,
                Educational: 53,
            },
            {
                name: 'Mar',
                General: 2000,
                Resources: 9800,
                Services: 2800,
                Financial: 400,
                Spiritual: 894,
                Educational: 800,
            },
            {
                name: 'Apr',
                General: 2780,
                Resources: 3908,
                Services: 3200,
                Financial: 1500,
                Spiritual: 934,
                Educational: 745,
            },
            {
                name: 'May',
                General: 1890,
                Resources: 4800,
                Services: 4000,
                Financial: 3000,
                Spiritual: 323,
                Educational: 800,
            },
        ],
        2024: [
            {
                name: 'Jan',
                General: 2200,
                Resources: 3300,
                Services: 1500,
                Financial: 1000,
                Spiritual: 1398,
                Educational: 3355,
            },
            {
                name: 'Feb',
                General: 2800,
                Resources: 4300,
                Services: 1800,
                Financial: 1200,
                Spiritual: 493,
                Educational: 354,
            },
            {
                name: 'Mar',
                General: 3400,
                Resources: 2000,
                Services: 2400,
                Financial: 2100,
                Spiritual: 23,
                Educational: 800,
            },
            {
                name: 'Apr',
                General: 2500,
                Resources: 3700,
                Services: 2800,
                Financial: 1800,
                Spiritual: 345,
                Educational: 645,
            },
            {
                name: 'May',
                General: 4000,
                Resources: 5000,
                Services: 3500,
                Financial: 2400,
                Spiritual: 504,
                Educational: 800,
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
                            Your Performance
                        </h2>
                        <p className="text-sm text-gray-600">
                            Points comparison of different categories
                        </p>
                    </div>

                    <Select
                        value={{
                            value: selectedYear,
                            label: selectedYear,
                        }}
                        onChange={handleYearChange}
                        options={Object.keys(multiLineData).map((year) => ({
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
                                multiLineData[
                                    selectedYear as unknown as keyof typeof multiLineData
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
                                dataKey="General"
                                stroke="#0CAF60"
                                strokeWidth={2}
                                dot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Resources"
                                stroke="#FF5733"
                                strokeWidth={2}
                                dot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Services"
                                stroke="#007BFF"
                                strokeWidth={2}
                                dot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Financial"
                                stroke="#e342f5"
                                strokeWidth={2}
                                dot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Spiritual"
                                stroke="#4000ff"
                                strokeWidth={2}
                                dot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Educational"
                                stroke="#ff7b00"
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

export default MultiLineGraph
