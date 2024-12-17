import { useEffect, useState } from 'react'
import BasicLine from '@/components/graph/Charts/BasicLine'
import { Dropdown, Tabs } from '@/components/ui'
import ToolButton from '@/components/shared/RichTextEditor/toolButtons/ToolButton'
import SimplePie from '@/components/graph/Charts/SimplePie'
import Loading from '@/components/shared/Loading'
import TabContent from '@/components/ui/Tabs/TabContent'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import { DebouceInput } from '@/components/shared'
import { TbSearch } from 'react-icons/tb'
import DashboardGraph from './Graph'
import FruitSalesPieChart from './Pie'

const AnalyticsSection = () => {
    const years = [2022, 2021, 2020, 2019, 2018, 2017]
    const [selectedYear, setSelectedYear] = useState(2022)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    return (
        // <Loading loading={isLoading} customLoader>
            <div className=''>
            <div className="md:p-4">
                {/* chart of recharts */}

                <DashboardGraph/>
                
            </div>

            <div className="grid">
                <FruitSalesPieChart/>

            </div>
            </div>
        // </Loading>
    )
}

export default AnalyticsSection
