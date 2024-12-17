import { Card } from '@/components/ui'
import React from 'react'

const AnswerLoading = () => {
  return (
    <Card className="bg-gray-100 border-none animate-pulse">
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 bg-gray-200 rounded w-3/4 mx-auto"></h1>

    <Card className="">
        <div className="p-6 space-y-4">
            <div className="w-1/2 h-8 bg-gray-200 rounded"></div>

            <div className="mb-6 space-y-2">
                <h3 className="text-lg font-medium text-gray-700 mb-2 bg-gray-200 rounded w-3/4 h-6"></h3>
                <p className="text-gray-600 bg-gray-200 rounded w-full h-4"></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <span className="bg-gray-200 rounded w-24 h-4"></span>
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <span className="bg-gray-200 rounded w-24 h-4"></span>
                </div>
            </div>

            <form>
                <div className="mb-4 space-y-2">
                    <label
                        htmlFor="answer"
                        className="block text-sm font-medium text-gray-700 mb-2 bg-gray-200 rounded w-1/2 h-6"></label>
                    <div className="w-full h-16 bg-gray-200 rounded"></div>
                </div>

                <div className="w-full h-10 bg-gray-200 rounded"></div>
            </form>
        </div>
    </Card>
</Card>

  )
}

export default AnswerLoading