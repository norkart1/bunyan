import { Card } from '@/components/ui'
import React from 'react'

const CardSkeleton = () => {
  return (
    <Card className="w-full md:w-1/2 border border-gray-400 animate-pulse">
    <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center"></div>
            <h4 className="text-2xl bg-gray-200 rounded w-24 h-6"></h4>
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
    </div>
    <div className="mt-5 space-y-4">
        {Array(3)
            .fill(null)
            .map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between py-2 dark:border-gray-600 mb-2"
                >
                    <div className="flex items-center gap-2">
                        <div>
                            <div className="w-48 h-6 bg-gray-200 rounded"></div>
                            <div className="w-32 h-4 bg-gray-200 rounded mt-1"></div>
                        </div>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
            ))}
    </div>
</Card>

  )
}

export default CardSkeleton