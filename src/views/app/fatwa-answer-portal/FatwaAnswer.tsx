import { DebouceInput } from '@/components/shared'
import { Button, Card, Select } from '@/components/ui'
import { FIND_ALL_FATWAS } from '@/graphql/queries/fatwa'
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BiCalendar, BiPhone, BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import FatwaAnsweringPortalSkeleton from './components/LoadingSkeleton'
import FatwaCard from './components/FatwaCard'
import { Fatwa } from '@/generated/graphql'

type FatwaStatus = 'PENDING' | 'ANSWERED' | 'REJECTED'


type OptionType = {
    value: 'PENDING' | 'ANSWERED' | 'REJECTED' | 'ALL'
    label: string
}

const FatwaAnsweringPortal = () => {
    const [selectedStatus, setSelectedStatus] = useState<OptionType>(
       { value: 'ALL', label: 'All' }
    )
    const [searchQuery, setSearchQuery] = useState('')


    const [allFatwas, setAllFatwas] = useState<Fatwa[]>([])

    const { data: FindAllFatwas, error: allFatwasError, loading: allFatwasLoading } = useQuery(FIND_ALL_FATWAS, {
      variables: {
        limit: 1000,
        offset: 0,
        orderBy: {}, // Adjust as needed
        relationsToFilter: {}, // Adjust as needed
        filters: {
          question: { contains: searchQuery || '', mode: 'insensitive' }, // Works for string fields
          status: selectedStatus.value === 'ALL'
           ? undefined : selectedStatus?.value , // Ensure it matches Prisma's expectations
        },
      },
    });
    
    
    
    

    useEffect(() => {
      setAllFatwas([])
        if (FindAllFatwas) {
            setAllFatwas(FindAllFatwas.fatwas)
        }
    }, [FindAllFatwas])

    type CustomOption = {
        value: string
        label: string
    }

    const options: CustomOption[] = [
        { value: 'PENDING', label: 'Pending' },
        { value: 'ANSWERED', label: 'Answered' },
        { value: 'REJECTED', label: 'Rejected' },
        { value: 'ALL', label: 'All' },
    ]

    return (
        <Card className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Fatwa Answering Portal
            </h1>

            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <DebouceInput
                    type="text"
                    placeholder="Search fatwas..."
                    className="w-full"
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                    suffix={<BiSearch className="text-lg" />}
                />
                <div className="w-full md:w-auto">
                    <Select
                        name="status"
                        id="status"
                        value={selectedStatus}
                        onChange={(value) =>
                            setSelectedStatus(value as OptionType)
                        }
                        options={options as any}
                        className='md:min-w-[200px]'
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFatwas?.map((fatwa : Fatwa) => (
                    <FatwaCard fatwa={fatwa} key={fatwa.id} />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                allFatwasLoading && (
                    Array(6).fill(0).map((_, index) => (
                        <FatwaAnsweringPortalSkeleton/>
                    ))
                )
            }
            </div>

            {
                allFatwasError && (
                    <div className="text-center text-red-500">
                        Error fetching data
                    </div>
                )
            }

            {
                !allFatwasLoading && allFatwas.length === 0 && (
                    <div className="text-center text-gray-500">
                        No fatwas found
                    </div>
                )
            }
        </Card>
    )
}

export default FatwaAnsweringPortal

