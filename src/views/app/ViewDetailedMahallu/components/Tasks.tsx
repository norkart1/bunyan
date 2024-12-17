import React, { useEffect, useState } from 'react'
import Table from '../../../../components/ui/Table/Table'
import THead from '../../../../components/ui/Table/THead'
import { AdaptiveCard, Container, DebouceInput, GrowShrinkValue } from '@/components/shared'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import Td from '@/components/ui/Table/Td'
import { useMutation, useQuery } from '@apollo/client'
import { FIND_ALL_TASK_PARTICIPANTS } from '@/graphql/queries/task-participant'
import { TaskParticipant } from '@/generated/graphql'
import { Button } from '@/components/ui'
import { CLAIM_TASK_PARTICIPANT } from '@/graphql/mutations/task-participant'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'
import { useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'

export default function TasksTable() {

    const [search, setSearch] = React.useState('')
    const [taskParticipants, setTaskParticipants] = React.useState<TaskParticipant[]>([])
    const user = useSessionUser(state => state.user)
    const { id } = useParams<{ id: string }>()

    const { data, error, loading, refetch } = useQuery(FIND_ALL_TASK_PARTICIPANTS, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {
                title: { contains: search, mode: 'insensitive' },
                mahalluId: parseInt(id as string)
            }
        }
    })

    useEffect(() => {
        if (data) {
            setTaskParticipants(data.taskParticipants)
        }
    }, [data])

    return (
        <>
            <DebouceInput
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="m-4 border border-gray-400 rounded-2xl ">
                <AdaptiveCard>
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Status</Th>
                                <Th>Points</Th>
                            </Tr>
                        </THead>
                        {
                            loading ? <TBody>
                                {Array.from({ length: 5 }).map((_, index) => ( // Replace '5' with the number of skeleton rows you want
                                    <Tr key={index} className="animate-pulse">
                                        {/* Title Column Skeleton */}
                                        <Td>
                                            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                                        </Td>

                                        {/* Category Button Skeleton */}
                                        <Td>
                                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                                        </Td>

                                        {/* Status Button Skeleton */}
                                        <Td>
                                            <div className="h-6 w-full bg-gray-300 rounded"></div>
                                        </Td>

                                        {/* Points Column Skeleton */}
                                        <Td>
                                            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                                        </Td>
                                    </Tr>
                                ))}
                            </TBody>
                                : taskParticipants.length > 0 ? <TBody>
                                    {
                                        taskParticipants.map((taskParticipant, index) => (
                                            <Tr key={taskParticipant.id}>
                                                <Td>{taskParticipant.title}</Td>
                                                <Td><Button
                                                    className="text-xs mb-2"
                                                    size="xs"
                                                    style={{
                                                        color: 'white', // Default text color
                                                        backgroundColor: taskParticipant?.task?.category?.color || 'transparent', // Default background color
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        ; (e.target as HTMLElement).style.backgroundColor =
                                                            'white'
                                                            ; (e.target as HTMLElement).style.color =
                                                                taskParticipant?.task?.category?.color || 'black'
                                                            ; (e.target as HTMLElement).style.borderColor =
                                                                taskParticipant?.task?.category?.color || 'transparent'
                                                            ; (e.target as HTMLElement).style.boxShadow =
                                                                `0 0 0 1px ${taskParticipant?.task?.category?.color || 'transparent'}`
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        ; (e.target as HTMLElement).style.backgroundColor =
                                                            taskParticipant?.task?.category?.color || 'transparent'
                                                            ; (e.target as HTMLElement).style.color = 'white'
                                                    }}
                                                >
                                                    {taskParticipant?.task?.category?.title}
                                                </Button></Td>
                                                <Td>{
                                                    // Check the first participant's status
                                                    (() => {
                                                        const participant = taskParticipant
                                                        if (participant) {
                                                            // Pending Button
                                                            if (!participant.verified && !participant.claimed) {
                                                                return (
                                                                    <Button
                                                                        size='xs'
                                                                        className='w-full'
                                                                    >
                                                                        Pending
                                                                    </Button>
                                                                );
                                                            }

                                                            // Claim Button
                                                            if (!participant.claimed) {
                                                                return (
                                                                    <Button
                                                                        size='xs'
                                                                        className="w-full"
                                                                        variant="solid"
                                                                    >
                                                                        Verified                                                         </Button>
                                                                );
                                                            }

                                                            // Claimed Button
                                                            if (participant.claimed) {
                                                                return (
                                                                    <Button
                                                                        size='xs'
                                                                        disabled
                                                                        className="w-full"
                                                                        variant="solid"
                                                                    >
                                                                        Claimed
                                                                    </Button>
                                                                );
                                                            }
                                                        }
                                                        return null; // Fallback if no participant matches the conditions
                                                    })()
                                                }</Td>
                                                <Td>{taskParticipant.task?.points}</Td>
                                            </Tr>
                                        ))
                                    }
                                </TBody> : error ? <TBody>
                                    <Tr>
                                        <Td colSpan={4} className="text-center">{error.message}</Td>
                                    </Tr>
                                </TBody> : <TBody>
                                    <Tr>
                                        <Td colSpan={4} className="text-center">No tasks found</Td>
                                    </Tr>
                                </TBody>
                        }
                    </Table>
                </AdaptiveCard>
            </div>
        </>
    )
}
