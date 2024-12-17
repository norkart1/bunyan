import React from 'react'
import TaskCard from './components/TaskCard'
import { Card, Select } from '@/components/ui'
import { DebouceInput } from '@/components/shared'
import { TbSearch } from 'react-icons/tb'
import { useQuery } from '@apollo/client'
import { FIND_ALL_TASKS } from '@/graphql/queries/task'
import { Task } from '@/generated/graphql'
import TaskCardSkeleton from './components/TaskCardSkeleton'

const ViewTasks = () => {

    const [selectedOption, setSelectedOption] = React.useState<any>(null)
    const [tasks, setTasks] = React.useState([])
    const [search, setSearch] = React.useState('')

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_TASKS, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
        },
    });

    React.useEffect(() => {
        console.log(selectedOption);

        setTasks([])
        if (findAllData) {
            setTasks(findAllData.tasks)
        }
    }, [findAllData])

    const options = [
        { value: 'all', label: 'All' },
        { value: 'verified', label: 'Verified' },
        { value: 'claimed', label: 'Claimed' },
        { value: 'pending', label: 'Pending' },
    ]

    const updateStateAfterRefetch = async () => {
        const { data } = await refetchFindAll()
        if (data) {
            setTasks(data.tasks)
        }
    }
    return (
        <Card className="w-full h-full ">
            {/* <div className="flex flex-row items-center justify-between py-2 md:py-4 md:px-6 lg:px-8">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-700">
                Tasks
                </h1>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <DebouceInput
                        placeholder="Search"
                        suffix={<TbSearch className="text-lg" />}
                        size="sm"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    
                </div>
            </div> */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3>Tasks</h3>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <DebouceInput
                        placeholder="Search"
                        suffix={<TbSearch className="text-lg" />}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='flex flex-wrap gap-4'>
                    {
                        tasks && tasks.map((task: Task) => (
                            <TaskCard updateState={updateStateAfterRefetch} task={task} key={task.id} />
                        ))
                    }
                    {
                        tasks && tasks.length === 0 && !findAllLoading && (
                            <div className="w-full text-center text-gray-500">No Tasks found</div>
                        )
                    }
                    {
                        findAllLoading && (
                            [...Array(10)].map((_, index) => (
                                <TaskCardSkeleton key={index} />
                            ))
                        )
                    }
                </div>
            </div>

        </Card>
    )
}

export default ViewTasks
