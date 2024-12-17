import React from 'react'
import { Card, Select } from '@/components/ui'
import { DebouceInput } from '@/components/shared'
import { TbSearch } from 'react-icons/tb'
import { useQuery } from '@apollo/client'
import { TaskParticipant } from '@/generated/graphql'
import { GET_MY_PARTICIPANTS } from '@/graphql/queries/task-participant'
import TaskParticipantCard from './components/TaskParticipantCard'
import TaskParticipantCardSkeleton from './components/TaskParticipantCardSkelton'

const VerifyTaskParticipants = () => {

    const [selectedOption, setSelectedOption] = React.useState<any>(null)
    const [taskParticipants, setTaskParticipants] = React.useState([])
    const [search, setSearch] = React.useState('')

    const { data: taskParticipantsData, loading: taskParticipantsLoading, error: taskParticipantsError } = useQuery(GET_MY_PARTICIPANTS, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {
                task: {
                    title: { contains: search, mode: 'insensitive' },
                },
                mahallu: {
                    name: { contains: search, mode: 'insensitive' },
                }
            },
        },
    })

    React.useEffect(() => {
        setTaskParticipants([])
        if (taskParticipantsData) {
            setTaskParticipants(taskParticipantsData.getFromTaskParticipationOnMyVillage)
        }
    }, [taskParticipantsData])

    return (
        <Card className="w-full h-full ">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3>Task Participants</h3>
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
                        taskParticipants && taskParticipants.map((taskParticipant: TaskParticipant) => (
                            <TaskParticipantCard taskParticipant={taskParticipant} key={taskParticipant.id} />
                        ))
                    }
                    {
                        taskParticipants && taskParticipants.length === 0 && !taskParticipantsLoading && (
                            <div className="w-full text-center">No Task Participants found</div>
                        )
                    }
                    {
                        taskParticipantsLoading && (
                            [...Array(10)].map((_, index) => (
                                <TaskParticipantCardSkeleton key={index} />
                            ))
                        )

                    }
                </div>
            </div>

        </Card>
    )
}

export default VerifyTaskParticipants
