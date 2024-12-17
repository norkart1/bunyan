
import { Card } from '@/components/ui'
import { Mahallu, MahalluRankingDetails } from '@/generated/graphql'
import { COUNT_MAHALLUS, FIND_MAHALLU_BY_ID, GET_MAHALLU_RANKING } from '@/graphql/queries/mahallu'
import { useSessionUser } from '@/store/authStore'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { BiGlobe, BiHomeAlt, BiMapPin, BiTrophy } from 'react-icons/bi'

export default function Ranking() {
    // const districtRank = 5
    // const overallRank = 10
    // const zoneRank = 2
    // const villageRank = 1
    // const totalMahallus = 100

    const user = useSessionUser(state => state.user)
    const [ranks, setRanks] = useState<MahalluRankingDetails>()
    const { data, error, loading } = useQuery(GET_MAHALLU_RANKING, {
        variables: {
            mahalluId: user?.mahalluId
        }
    })

    useEffect(() => {
        if (data) {
            setRanks(data.getMahalluRanking)
        }
    }, [data])

    return (
        <>
            {
                loading ? (
                    <Card className="w-full mx-auto bg-white border border-gray-400 overflow-hidden z-0 animate-pulse">
                        <div className="">
                            <div className="h-6 w-32 bg-gray-300 rounded mb-6"></div>
                            <div className="grid gap-3">
                                {/* Overall Rank Skeleton */}
                                <Card className="bg-gray-200 border transform transition-all duration-300">
                                    <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-10 w-32 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-5 w-20 bg-gray-300 rounded"></div>
                                </Card>

                                {/* District, Zone, Village Skeletons */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {[...Array(3)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-200 border rounded p-4 flex flex-col items-start gap-2"
                                        >
                                            <div className="h-6 w-10 bg-gray-300 rounded-full"></div>
                                            <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ) : error ? (
                    <Card className="w-full mx-auto bg-white border border-gray-400 overflow-hidden z-0">
                        <div className="">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Ranking
                            </h2>
                            <div className="grid gap-3">
                                <Card className="bg-red-200 border transform transition-all duration-300">
                                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-2 text-red-800">
                                        <BiTrophy className="h-6 w-6" />
                                        Error
                                    </h3>
                                    <p className="text-4xl font-bold">
                                        {error.message}
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </Card>
                ) : <Card className="w-full  mx-auto bg-white border border-gray-400 overflow-hidden z-0">
                    <div className="">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Ranking
                        </h2>
                        <div className="grid gap-3">
                            <Card className="bg-primary-mild text-white border transform transition-all duration-300">
                                <h3 className="text-xl font-semibold flex items-center gap-2 mb-2 text-white">
                                    <BiTrophy className="h-6 w-6" />
                                    Overall Rank
                                </h3>
                                <p className="text-4xl font-bold">
                                    {ranks?.overallRanking?.rank as number}{" "}
                                    <span className="text-lg font-normal">
                                        of {ranks?.overallRanking?.totalEntities as number}
                                    </span>
                                </p>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <RankItem
                                    icon={BiMapPin}
                                    title="District"
                                    rank={ranks?.districtRanking?.rank as number}
                                    total={ranks?.districtRanking?.totalEntities as number}
                                />
                                <RankItem
                                    icon={BiGlobe}
                                    title="Zone"
                                    rank={ranks?.zoneRanking?.rank as number}
                                    total={ranks?.zoneRanking?.totalEntities as number}
                                />
                                <RankItem
                                    icon={BiHomeAlt}
                                    title="Village"
                                    rank={ranks?.villageRanking?.rank as number}
                                    total={ranks?.villageRanking?.totalEntities as number}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            }

        </>
    )
}

function RankItem({
    icon: Icon,
    title,
    rank,
    total,
}: {
    icon: typeof BiTrophy
    title: string
    rank: number
    total: number
}) {
    return (
        <Card className="bg-gray-50 rounded-lg transition-all duration-300 ">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700 mb-2">
                <Icon className="h-5 w-5" />
                {title}
            </h3>
            <p className="text-2xl font-bold text-gray-800">
                {rank}{' '}
                <span className="text-sm font-normal text-gray-600">
                    of {total}
                </span>
            </p>
        </Card>
    )
}
