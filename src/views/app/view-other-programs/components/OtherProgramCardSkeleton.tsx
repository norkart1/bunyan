import React from 'react'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

const OtherProgramCardSkeleton = () => {
  return (
    <Card className="w-full md:w-[45%] lg:w-[30%] bg-gray-100 border border-gray-300">
      <div className="flex gap-2 flex-wrap">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>

      <div className="flex flex-col pt-2 space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      <div className="flex gap-2 mt-4">
        <Skeleton className="h-6 w-32 rounded-md" />
      </div>
    </Card>
  )
}

export default OtherProgramCardSkeleton