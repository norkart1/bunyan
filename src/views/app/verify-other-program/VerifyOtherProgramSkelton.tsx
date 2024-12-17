import React from 'react';
import { Card, Skeleton } from '@/components/ui';

const VerifyOtherProgramSkelton = () => {
    return (
        <Card className="w-full">
            <div className="flex flex-col lg:flex-row">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 p-2">
                    {/* Buttons Skeleton */}
                    <div className="flex gap-2 mb-4">
                        <Skeleton className="h-6 w-24 rounded" />
                        <Skeleton className="h-6 w-36 rounded" />
                    </div>

                    {/* Title Skeleton */}
                    <Skeleton className="h-10 w-3/4 rounded mb-4" />

                    {/* Description Skeleton */}
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-11/12 rounded mb-2" />
                    <Skeleton className="h-4 w-10/12 rounded" />
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 p-4">
                    {/* Upload Section Title */}
                    <Skeleton className="h-10 w-1/2 rounded mb-8" />

                    {/* Input Fields */}
                    <Skeleton className="h-6 w-full rounded mb-6" />
                    <Skeleton className="h-24 w-full rounded mb-6" />

                    {/* Upload Placeholder */}
                    <div className="border-2 border-dashed rounded-lg py-10 px-4">
                        <div className="flex flex-col items-center">
                            <Skeleton className="h-16 w-16 rounded-full mb-4" />
                            <Skeleton className="h-4 w-3/4 rounded mb-2" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                        </div>
                    </div>

                    {/* Upload Button */}
                    <Skeleton className="h-10 w-full rounded mt-8" />
                </div>
            </div>
        </Card>
    );
};

export default VerifyOtherProgramSkelton;
