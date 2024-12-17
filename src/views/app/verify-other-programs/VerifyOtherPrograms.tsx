import React from 'react'
import { Card, Select } from '@/components/ui'
import { DebouceInput } from '@/components/shared'
import { TbSearch } from 'react-icons/tb'
import { useQuery } from '@apollo/client'
import { OtherProgram } from '@/generated/graphql'
import { GET_MY_OTHER_PROGRAMS } from '@/graphql/queries/other-program'
import OtherProgramCard from './components/OtherProgramCard'
import OtherProgramCardSkeleton from './components/OtherProgramCardSkelton'

const VerifyOtherPrograms = () => {

    const [selectedOption, setSelectedOption] = React.useState<any>(null)
    const [otherPrograms, setOtherPrograms] = React.useState([])
    const [search, setSearch] = React.useState('')

    const { data: otherProgramsData, loading: otherProgramsLoading, error: otherProgramsError } = useQuery(GET_MY_OTHER_PROGRAMS, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
        },
    })

    React.useEffect(() => {
        setOtherPrograms([])
        if (otherProgramsData) {
            setOtherPrograms(otherProgramsData.getFromOtherProgramsOnMyVillage)
        }
    }, [otherProgramsData])

    return (
        <Card className="w-full h-full ">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3>Other Programs</h3>
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
                        otherPrograms && otherPrograms.map((otherProgram: OtherProgram) => (
                            <OtherProgramCard otherProgram={otherProgram} key={otherProgram.id} />
                        ))
                    }
                    {
                        otherPrograms && otherPrograms.length === 0 && !otherProgramsLoading && (
                            <div className="w-full text-center text-gray-500">No Other Programs found</div>
                        )
                    }
                    {
                        otherProgramsLoading && (
                            [...Array(10)].map((_, index) => (
                                <OtherProgramCardSkeleton key={index} />
                            ))
                        )

                    }
                </div>
            </div>

        </Card>
    )
}

export default VerifyOtherPrograms
