import { COUNT_FATWAS } from '@/graphql/queries/fatwa'
import { useSessionUser } from '@/store/authStore'
import { useQuery } from '@apollo/client'
import React from 'react'

const InfoBar = () => {
    const user = useSessionUser((state) => state.user)

    // Queries
    const { data: fatwasCount, loading: loadingFatwasCount, error: errorFatwasCount } = useQuery(COUNT_FATWAS)
    const { data: fatwasAnsweredCount, loading: loadingFatwasAnswered, error: errorFatwasAnswered } = useQuery(COUNT_FATWAS, {
        variables: {
            filters: {
                status: "ANSWERED",
            },
        },
    })

    // Show loading skeleton if any query is loading
    if (loadingFatwasCount || loadingFatwasAnswered) {
        return (
            <div className="w-full relative bg-neutral rounded-3xl grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-4 sm:grid-cols-1 sm:grid-rows-4 gap-4 border border-gray-400 animate-pulse">
                {Array(4).fill(null).map((_, index) => (
                    <div key={index} className="relative py-6 px-4 flex gap-4">
                        <div className="rounded-full bg-gray-200 w-20 h-20"></div>
                        <div className="flex items-start justify-center flex-col gap-2">
                            <div className="bg-gray-200 rounded w-32 h-4"></div>
                            <div className="bg-gray-200 rounded w-24 h-6"></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // Show error message if any query fails
    if (errorFatwasCount || errorFatwasAnswered) {
        return (
            <div className="w-full relative bg-red-100 rounded-3xl p-6 text-red-700">
                <p>Error loading data. Please try again later.</p>
            </div>
        )
    }

    return (
        <div className="w-full relative bg-neutral rounded-3xl grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-4 sm:grid-cols-1 sm:grid-rows-4 gap-4 border border-gray-400">
            {/* Card 1 */}
            <div className="relative pt-8 pb-4 md:py-6 px-8">
                <p className="text-md">Assalamu Alaikum,</p>
                <p className="text-2xl text-gray-950">
                    Hi, {user?.username} Ustad
                </p>
            </div>

            {/* Card 2 */}
            <div className="relative py-6 px-4 flex gap-4">
                <div className="rounded-full bg-[#E7FFCD] w-20 h-20 items-center justify-center flex">
                    <img src="/img/icons/mosque.png" alt="profile" />
                </div>
                <div className="flex items-start justify-center flex-col">
                    <p className="text-xs">Total Fatwas</p>
                    <p className="text-3xl text-gray-950 font-medium">
                        {fatwasCount?.countFatwas}
                    </p>
                </div>
                <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-400 lg:block md:block hidden"></div>
            </div>

            {/* Card 3 */}
            <div className="relative py-6 px-4 flex gap-4">
                <div className="rounded-full bg-[#FFF7CD] w-20 h-20 items-center justify-center flex">
                    <img src="/img/icons/mosque.png" alt="profile" />
                </div>
                <div className="flex items-start justify-center flex-col">
                    <p className="text-xs">Total Fatwas Answered</p>
                    <p className="text-3xl text-gray-950 font-medium">
                        {fatwasAnsweredCount?.countFatwas}
                    </p>
                </div>
                <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-400 lg:block md:block hidden"></div>
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-400 block md:hidden"></div>
            </div>

            {/* Card 4 */}
            <div className="relative py-6 px-4 flex gap-4">
                <div className="rounded-full bg-[#CDDBFF] w-20 h-20 items-center justify-center flex">
                    <img src="/img/icons/mosque.png" alt="profile" />
                </div>
                <div className="flex items-start justify-center flex-col">
                    <p className="text-xs">Total Fatwas Pending</p>
                    <p className="text-3xl text-gray-950 font-medium">
                        {fatwasCount?.countFatwas - fatwasAnsweredCount?.countFatwas}
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gray-400 block md:hidden"></div>
            </div>
        </div>
    )
}

export default InfoBar
