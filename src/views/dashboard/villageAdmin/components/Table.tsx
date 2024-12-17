import Table from '../../../../components/ui/Table/Table'
import THead from '../../../../components/ui/Table/THead'
import { AdaptiveCard, Container, GrowShrinkValue } from '@/components/shared'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import Td from '@/components/ui/Table/Td'
import { LEADERBOARD } from '@/graphql/leaderboard'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { MahalluLeaderboardEntry } from '@/generated/graphql'
import { useSessionUser } from '@/store/authStore'

export default function RankTable() {
    const user = useSessionUser(state => state.user)
    const [leaderboard, setLeaderboard] = useState<MahalluLeaderboardEntry[]>([])
    const { data, error, loading } = useQuery(LEADERBOARD, {
        variables: {
            limit: 5,
            offset: 0,
            villageId: user?.villageId
        }
    })

    useEffect(() => {
        if (data) {
            setLeaderboard(data.getLeaderboard)
        }
    }, [data])

    return (
        <div className="mt-4 border border-gray-400 rounded-2xl ">
            <AdaptiveCard>
                <Table>
                    <THead>
                        <Tr>
                            <Th>Rank</Th>
                            <Th>Name</Th>
                            <Th>Badges</Th>
                            <Th>Tasks</Th>
                            <Th>Other Programs</Th>
                            <Th>Points</Th>
                        </Tr>
                    </THead>
                    {
                        loading ? (
                            <TBody>
                                {[...Array(5)].map((_, rowIndex) => (
                                    <Tr key={rowIndex} className="animate-pulse">
                                        {/* Rank */}
                                        <Td>
                                            <div className="flex gap-2 items-center">
                                                <div className="w-8 h-4 bg-gray-300 rounded"></div>
                                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                            </div>
                                        </Td>

                                        {/* Name */}
                                        <Td>
                                            <div className="flex gap-2 items-center">
                                                <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                                                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                                            </div>
                                        </Td>

                                        {/* Badges, Tasks, Activities, Points */}
                                        {[...Array(4)].map((_, cellIndex) => (
                                            <Td key={cellIndex}>
                                                <div className="w-8 h-4 bg-gray-300 rounded mx-auto"></div>
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </TBody>
                        ) : error ? (
                            <TBody>
                                <Tr>
                                    <Td colSpan={6} className="text-center text-gray-500">
                                        {error.message}
                                    </Td>
                                </Tr>
                            </TBody>
                        ) : (
                            <TBody>
                                {
                                    leaderboard?.map((rank, index) => (
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{rank.name}</Td>
                                            <Td>{rank.badges?.length}</Td>
                                            <Td>{rank?.counts?.taskParticipants}</Td>
                                            <Td>{rank?.counts?.otherPrograms}</Td>
                                            <Td>{rank.totalPoints}</Td>
                                        </Tr>
                                    ))
                                }
                            </TBody>
                        )
                    }
                </Table>
            </AdaptiveCard>
        </div>
    )
}
