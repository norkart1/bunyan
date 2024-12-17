import { Card } from '@/components/ui'
import React from 'react'
import { BiCalendar, BiPhone, BiSearch } from 'react-icons/bi'

const FatwaAnsweringPortalSkeleton = () => {
    return (
        <Card>
            <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <BiCalendar className="mr-2 h-4 w-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <BiPhone className="mr-2 h-4 w-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-2xl">
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
        </Card>
    )
}

export default FatwaAnsweringPortalSkeleton
