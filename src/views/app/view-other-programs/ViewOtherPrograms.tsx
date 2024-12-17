import React from 'react'
import OtherProgramCard from './components/OtherProgramCard'
import { Button, Card, Select } from '@/components/ui'
import { DebouceInput } from '@/components/shared'
import { TbSearch } from 'react-icons/tb'
import { useQuery } from '@apollo/client'
import { FIND_ALL_OTHER_PROGRAMS } from '@/graphql/queries/other-program'
import { OtherProgram } from '@/generated/graphql'
import OtherProgramCardSkeleton from './components/OtherProgramCardSkeleton'
import { FaPlusCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ViewOtherPrograms = () => {

    const [selectedOption, setSelectedOption] = React.useState<any>(null)
    const [otherPrograms, setOtherPrograms] = React.useState([])
    const [search, setSearch] = React.useState('')

    const navigate = useNavigate()

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_OTHER_PROGRAMS, {
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

        setOtherPrograms([])
        if (findAllData) {
            setOtherPrograms(findAllData.otherPrograms)
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
            setOtherPrograms(data.otherPrograms)
        }
    }
    return (
        <Card className="w-full h-full ">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3>Other Programs</h3>
                    <Button
                        variant="solid"
                        className="flex items-center"
                        onClick={() => navigate('/submit-other-program')}
                    >
                        <FaPlusCircle className="mr-1" />
                        Add New
                    </Button>                </div>
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
                            <OtherProgramCard updateState={updateStateAfterRefetch} otherProgram={otherProgram} key={otherProgram.id} />
                        ))
                    }
                    {
                        otherPrograms && otherPrograms.length === 0 && !findAllLoading && (
                            <div className="w-full text-center text-gray-500">No Other Programs found</div>
                        )
                    }
                    {
                        findAllLoading && (
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

export default ViewOtherPrograms