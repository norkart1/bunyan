import React, { useEffect, useState } from 'react'
import Table from '@/components/ui/Table'
import THead from '@/components/ui/Table/THead'
import { AdaptiveCard, Container, DebouceInput, GrowShrinkValue } from '@/components/shared'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import Td from '@/components/ui/Table/Td'
import { useMutation, useQuery } from '@apollo/client'
import { FIND_ALL_EVENTS } from '@/graphql/queries/event'
import { Event } from '@/generated/graphql'
import { Button, Tag } from '@/components/ui'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'
import { useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'

export default function EventsTable() {

    const [search, setSearch] = React.useState('')
    const [events, setEvents] = React.useState<Event[]>([])
    const user = useSessionUser(state => state.user)
    const { id } = useParams<{ id: string }>()

    const { data, error, loading, refetch } = useQuery(FIND_ALL_EVENTS, {
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
            setEvents(data.events)
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
                                <Th>Image</Th>
                                <Th>Starting Date</Th>
                                <Th>Ending Date</Th>
                                <Th>Active</Th>
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
                                : events.length > 0 ? <TBody>
                                    {
                                        events.map((event, index) => (
                                            <Tr key={event.id}>
                                                <Td>{event.title}</Td>
                                                <Td>
                                                    <img
                                                        src={event.posterURL as string}
                                                        alt={event.title as string}
                                                        className="w-10 h-10 rounded-lg"
                                                    />
                                                </Td>
                                                <Td>{convertToYYYYMMDD(event.startingDate)}</Td>
                                                <Td>{convertToYYYYMMDD(event.endingDate)}</Td>
                                                <Td>
                                                    <Tag className={event.active ? 'bg-green-400' : 'bg-red-400'}>
                                                        {event.active ? 'Active' : 'Inactive'}
                                                    </Tag>
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </TBody> : error ? <TBody>
                                    <Tr>
                                        <Td colSpan={4} className="text-center">{error.message}</Td>
                                    </Tr>
                                </TBody> : <TBody>
                                    <Tr>
                                        <Td colSpan={4} className="text-center">No events found</Td>
                                    </Tr>
                                </TBody>
                        }
                    </Table>
                </AdaptiveCard>
            </div>
        </>
    )
}
