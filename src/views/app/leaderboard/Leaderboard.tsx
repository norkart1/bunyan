import { AdaptiveCard, Container, DebouceInput, GrowShrinkValue } from '@/components/shared'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import Td from '@/components/ui/Table/Td'
import { LEADERBOARD } from '@/graphql/leaderboard'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { MahalluLeaderboardEntry } from '@/generated/graphql'
import { Card, Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import { TbSearch } from 'react-icons/tb'

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<MahalluLeaderboardEntry[]>([])
    const [staticLeaderboard, setStaticLeaderboard] = useState<MahalluLeaderboardEntry[]>([])
    const [search, setSearch] = useState('')
    const { data, error, loading } = useQuery(LEADERBOARD, {
        variables: {
            limit: 1000,
            offset: 0,
        }
    })

    const { data: staticLeaderboardData, error: staticLeaderboardError, loading: staticLeaderboardLoading } = useQuery(LEADERBOARD, {
        variables: {
            limit: 3,
            offset: 0,
        }
    })

    useEffect(() => {
        if (data) {
            setLeaderboard(data.getLeaderboard)
        }
        if (staticLeaderboardData) {
            setStaticLeaderboard(staticLeaderboardData.getLeaderboard)
        }
    }, [data, staticLeaderboardData])

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Leaderboard</h3>
                    </div>
                    {
                        staticLeaderboardLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Skeleton Card 1 */}
                                <div className="rounded-[20px] p-4 shadow-lg bg-gray-200 animate-pulse">
                                    <div className="flex justify-between items-start">
                                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center gap-4 my-4">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <div className="h-4 w-36 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 text-center gap-2">
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                    </div>
                                </div>

                                {/* Skeleton Card 2 */}
                                <div className="rounded-[20px] p-4 shadow-lg bg-gray-200 animate-pulse">
                                    <div className="flex justify-between items-start">
                                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center gap-4 my-4">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <div className="h-4 w-36 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 text-center gap-2">
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                    </div>
                                </div>

                                {/* Skeleton Card 3 */}
                                <div className="rounded-[20px] p-4 shadow-lg bg-gray-200 animate-pulse">
                                    <div className="flex justify-between items-start">
                                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center gap-4 my-4">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <div className="h-4 w-36 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 text-center gap-2">
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ) : staticLeaderboard.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                {/* Gold Card */}
                                <div className="rounded-[20px] p-4 shadow-lg bg-[linear-gradient(135deg,#FFDF85,#E2B746)] border border-[#E2B746]">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm text-yellow-900 font-medium">#1 LEADING</p>
                                        <span className="text-4xl">🏆</span>
                                    </div>
                                    <div className="flex items-center gap-4 my-4">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <p className="text-lg font-bold text-yellow-900">
                                                {staticLeaderboard[0].name}
                                            </p>
                                            <p className="text-2xl font-bold text-yellow-900">
                                                {staticLeaderboard[0].totalPoints}<span className="text-sm font-normal">pts</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 text-center bg-[rgba(0,0,0,0.1)] rounded-lg p-2 text-yellow-900">
                                        <div>
                                            <p className="text-xs font-semibold">BADGES</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[0].badgesCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">TASKS</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[0].counts?.taskParticipants}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">POINTS</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[0].totalPoints}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Silver Card */}
                                <div className="rounded-[20px] p-4 shadow-lg bg-[linear-gradient(135deg,#F4F4F4,#C5C5C5)] border border-[#E0E0E0]">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm text-gray-800 font-medium">#2 LEADING</p>
                                        <span className="text-4xl">🏆</span>
                                    </div>
                                    <div className="flex items-center gap-4 my-4">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-800">
                                                {staticLeaderboard[1].name}
                                            </p>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {staticLeaderboard[1].totalPoints}<span className="text-sm font-normal">pts</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 text-center bg-[rgba(0,0,0,0.05)] rounded-lg p-2 text-gray-800">
                                        <div>
                                            <p className="text-xs font-semibold">BADGES</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[1].badgesCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">TASKS</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[1].counts?.taskParticipants}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">POINTS</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[1].totalPoints}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bronze Card */}
                                <div className="rounded-[20px] p-4 shadow-lg bg-[linear-gradient(135deg,#F5D8BE,#A67656)] border border-[#D0A57A]">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm text-white font-medium">#3 LEADING</p>
                                        <span className="text-4xl">🏆</span>
                                    </div>
                                    <div className="flex items-center gap-4 my-4">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <p className="text-lg font-bold text-white">
                                                {staticLeaderboard[2].name}
                                            </p>
                                            <p className="text-2xl font-bold text-white">
                                                {staticLeaderboard[2].totalPoints}<span className="text-sm font-normal">pts</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 text-center bg-[rgba(0,0,0,0.1)] rounded-lg p-2 text-white">
                                        <div>
                                            <p className="text-xs font-semibold">BADGES</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[2].badgesCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">TASKS</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[2].counts?.taskParticipants}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">POINTS</p>
                                            <p className="text-xl font-bold">{staticLeaderboard[2].totalPoints}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : staticLeaderboardError ? (
                            <div className="w-full">
                                <p className="text-center text-gray-500">{staticLeaderboardError.message}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Card>
                                    <p className="text-center text-gray-500">No data found</p>
                                </Card>
                            </div>
                        )
                    }
                    <DebouceInput
                        placeholder="Search"
                        suffix={<TbSearch className="text-lg" />}
                        onChange={(e) => setSearch(e.target.value)}
                    />
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
                            ) : leaderboard.length > 0 ? (
                                <TBody>
                                    {
                                        leaderboard
                                            ?.slice(3) // Skip the first 3 records
                                            .filter((ldb) => ldb.name.toLowerCase().includes(search.toLowerCase())) // Apply search filter
                                            .slice(0, 8) // Limit to the first 10 results after filtering
                                            .map((rank, index) => (
                                                <Tr key={rank.id}>
                                                    <Td>{leaderboard.indexOf(rank)}</Td>
                                                    <Td>{rank.name}</Td>
                                                    <Td>{rank.badges?.length || 0}</Td>
                                                    <Td>{rank?.counts?.taskParticipants || 0}</Td>
                                                    <Td>{rank?.counts?.otherPrograms || 0}</Td>
                                                    <Td>{rank.totalPoints}</Td>
                                                </Tr>
                                            ))
                                    }
                                </TBody>
                            ) : (
                                <TBody>
                                    <Tr>
                                        <Td colSpan={6} className="text-center text-gray-500">
                                            No data found
                                        </Td>
                                    </Tr>
                                </TBody>
                            )
                        }
                    </Table>
                </div>
            </AdaptiveCard>
        </Container>
    )
}
