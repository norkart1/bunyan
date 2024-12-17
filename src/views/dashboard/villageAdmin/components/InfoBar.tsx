import { Mahallu } from '@/generated/graphql'
import { COUNT_FAMILIES } from '@/graphql/queries/family'
import { COUNT_MAHALLUS, FIND_ALL_MAHALLUS, FIND_MAHALLU_BY_ID } from '@/graphql/queries/mahallu'
import { COUNT_MEMBERS } from '@/graphql/queries/member'
import { COUNT_TASKS } from '@/graphql/queries/task'
import { COUNT_TASK_PARTICIPANTS } from '@/graphql/queries/task-participant'
import { COUNT_VILLAGES, FIND_ONE_VILLAGE } from '@/graphql/queries/village'
import { FIND_ONE_ZONE } from '@/graphql/queries/zone'
import { useSessionUser } from '@/store/authStore'
import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { PiCheckFatDuotone, PiInfinity, PiInfinityDuotone, PiMosqueDuotone, PiUserDuotone, PiUsersFourDuotone } from 'react-icons/pi'

const InfoBar = () => {
    const { user } = useSessionUser((state) => state)
    const [mahallus, setMahallus] = React.useState<Mahallu[]>([])

    const { data: mahallusCount, error: mahallusCountError, loading: mahallusCountLoading } = useQuery(COUNT_MAHALLUS, {
        variables: {
            relationsToFilter: {},
            filters: {
                village: {
                    id: user?.villageId
                }
            },
        },
    })

    const { data: allMahallus, error: allMahallusError, loading: allMahallusLoading } = useQuery(FIND_ALL_MAHALLUS, {
        variables: {
            relationsToFilter: {},
            filters: {
                village: {
                    id: user?.villageId
                }
            },
        },
    })

    const { data: taskParticipants, error: taskParticipantsError, loading: taskParticipantsLoading } = useQuery(COUNT_TASK_PARTICIPANTS, {
        variables: {
            relationsToFilter: {},
            filters: {
                mahallu: {
                    village: {
                        id: user?.villageId
                    }
                }
            },
        },
    })

    const { data: singleVillage, error: singleVillageError, loading: singleVillageLoading } = useQuery(FIND_ONE_VILLAGE, {
        variables: {
            id: user?.villageId
        }
    })

    useEffect(() => {
        if (allMahallus) {
            setMahallus(allMahallus.mahallus)
        }
    }
        , [allMahallus])

    return (
        <div className='mb-6'>
            {
                mahallusCountLoading || allMahallusLoading || taskParticipantsLoading || singleVillageLoading ? (
                    <div className="w-full relative bg-neutral rounded-3xl grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-4 sm:grid-cols-1 sm:grid-rows-4 gap-4 border border-gray-400 animate-pulse">
                        {/* Card 1 */}
                        <div className="relative pt-8 pb-4 md:py-6 px-8">
                            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                            <div className="h-6 w-64 bg-gray-300 rounded"></div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative py-6 px-4 flex gap-4">
                            <div className="rounded-full bg-gray-300 w-20 h-20"></div>
                            <div className="flex items-start justify-center flex-col">
                                <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
                                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                            </div>
                            {/* Vertical line */}
                            <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-300 lg:block md:block hidden"></div>
                        </div>

                        {/* Card 3 */}
                        <div className="relative py-6 px-4 flex gap-4">
                            <div className="rounded-full bg-gray-300 w-20 h-20"></div>
                            <div className="flex items-start justify-center flex-col">
                                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                                <div className="h-6 w-28 bg-gray-300 rounded"></div>
                            </div>
                            {/* Vertical and horizontal lines */}
                            <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-300 lg:block md:block hidden"></div>
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-300 block md:hidden"></div>
                        </div>

                        {/* Card 4 */}
                        <div className="relative py-6 px-4 flex gap-4">
                            <div className="rounded-full bg-gray-300 w-20 h-20"></div>
                            <div className="flex items-start justify-center flex-col">
                                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                                <div className="h-6 w-28 bg-gray-300 rounded"></div>
                            </div>
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-300 block md:hidden"></div>
                        </div>
                    </div>
                ) : mahallusCountError || allMahallusError || taskParticipantsError || singleVillageError ? (
                    <div className="w-full h-28 relative bg-neutral rounded-3xl  border border-gray-400 flex justify-center items-center">
                        <p className='text-lg'>{mahallusCountError?.message || allMahallusError?.message || taskParticipantsError?.message || singleVillageError?.message}</p>
                    </div>
                ) : (
                    <div className="w-full relative bg-neutral rounded-3xl grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-4 sm:grid-cols-1 sm:grid-rows-4 gap-4 border border-gray-400">
                        {/* Card 1 */}
                        <div className="relative pt-8 pb-4 md:py-6 px-8">
                            <p className="text-md">Assalamu Alaikum,</p>
                            <p className="text-2xl text-gray-950">
                                {singleVillage?.village?.name} VILLAGE ADMIN
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="relative py-6 px-4 flex gap-4">
                            <div className="rounded-full bg-[#E7FFCD] w-20 h-20 items-center justify-center flex">
                                <PiMosqueDuotone className='w-14 h-14' />
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <p className="text-xs">Total Mahallus</p>
                                <p className="text-3xl text-gray-950 font-medium">
                                    {mahallusCount?.countMahallu}
                                </p>
                            </div>
                            {/* Vertical line */}
                            <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-400 lg:block md:block hidden"></div>
                        </div>

                        {/* Card 3 */}
                        <div className="relative py-6 px-4 flex gap-4">
                            <div className="rounded-full bg-[#CDDBFF] w-20 h-20 items-center justify-center flex">
                                <PiCheckFatDuotone className='w-14 h-14' />
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <p className="text-xs">Total Task Participants</p>
                                <p className="text-3xl text-gray-950 font-medium">{taskParticipants.countTaskParticipant}</p>
                            </div>
                            {/* Vertical line */}
                            <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-400 lg:block md:block hidden"></div>
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-400 block md:hidden"></div>
                        </div>

                        {/* Card 4 */}
                        <div className="relative py-6 px-4 flex gap-4">
                            <div className="rounded-full bg-[#FFF7CD] w-20 h-20 items-center justify-center flex">
                                <PiInfinityDuotone className='w-14 h-14' />
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <p className="text-xs">Total Points</p>
                                <p className="text-3xl text-gray-950 font-medium">
                                    {
                                        mahallus
                                            .map((mahallu) => mahallu?.totalPoints ?? 0) // Fallback to 0 for null/undefined
                                            .reduce((a, b) => a + b, 0) // Sum all the values
                                    }
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-400 block md:hidden"></div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default InfoBar
