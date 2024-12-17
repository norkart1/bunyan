import { Badge, Button, Card } from '@/components/ui'
import { Badge as BadgeType, Campaign, OtherProgram } from '@/generated/graphql'
import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import clsx from 'clsx'
import { timeAgo } from '@/utils/dateHelper'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CgEye } from 'react-icons/cg'

interface OtherProgramCardProps {
    // title: string
    // description: string
    // date: string
    // category: string
    // badge?: BadgeType
    // campaign?: Campaign
    // claimed?: boolean
    // verified?: boolean
    // remarks?: string
    // pending?: boolean
    otherProgram: OtherProgram
}

const OtherProgramCard = ({ otherProgram }: OtherProgramCardProps) => {
    const navigate = useNavigate()
    return (
        <div className="w-full md:w-[45%]  lg:w-[30%]">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out"
                onClick={(e) => console.log('Card Clickable', e)}
            >
                <Button
                    className="text-xs mb-2"
                    size="xs"
                    style={{
                        color: 'white', // Default text color
                        backgroundColor: otherProgram?.category?.color || 'transparent', // Default background color
                    }}
                    onMouseEnter={(e) => {
                        ; (e.target as HTMLElement).style.backgroundColor =
                            'white'
                            ; (e.target as HTMLElement).style.color =
                                otherProgram?.category?.color || 'black'
                            ; (e.target as HTMLElement).style.borderColor =
                                otherProgram?.category?.color || 'transparent'
                            ; (e.target as HTMLElement).style.boxShadow =
                                `0 0 0 1px ${otherProgram?.category?.color || 'transparent'}`
                    }}
                    onMouseLeave={(e) => {
                        ; (e.target as HTMLElement).style.backgroundColor =
                            otherProgram?.category?.color || 'transparent'
                            ; (e.target as HTMLElement).style.color = 'white'
                    }}
                >
                    {otherProgram?.category?.title}
                </Button>
                <div className="flex">
                    <h5>{otherProgram?.title}</h5>
                </div>
                <p className="mt-2">
                    {otherProgram?.description?.substring(0, 38)}...
                </p>
                <div className="flex gap-4 mt-2 justify-between items-center">
                    <p>{otherProgram?.mahallu?.name}</p>
                    <div className="flex gap-2">
                        {
                            otherProgram?.verified ? (
                                <>
                                    <Button
                                        disabled
                                        className="font-medium cursor-not-allowed"
                                        size="xs"
                                        variant="solid"
                                    >
                                        Verified
                                    </Button>
                                    <CgEye
                                        className={`self-center cursor-pointer`}
                                        size={20}
                                        onClick={() => navigate(`/verify-other-program/${otherProgram.id}`)}
                                    />
                                </>
                            ) : (
                                <Button
                                    variant="solid"
                                    size='xs'
                                    onClick={() => navigate(`/verify-other-program/${otherProgram.id}`)}
                                >
                                    Verify
                                </Button>
                            )
                        }
                    </div>

                </div>
            </Card>
        </div>
    )
}

export default OtherProgramCard
