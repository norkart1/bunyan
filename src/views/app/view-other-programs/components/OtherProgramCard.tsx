import { Badge, Button, Card } from '@/components/ui'
import { Badge as BadgeType, Campaign, OtherProgram } from '@/generated/graphql'
import React, { useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import clsx from 'clsx'
import { timeAgo } from '@/utils/dateHelper'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'
import { CLAIM_OTHER_PROGRAM } from '@/graphql/mutations/other-program'
import { useMutation } from '@apollo/client'

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
    updateState: any
    otherProgram: OtherProgram
}

const OtherProgramCard = ({ otherProgram, updateState }: OtherProgramCardProps) => {
    const [showConfetti, setShowConfetti] = useState(false)
    const [claimLoading, setClaimLoading] = useState(false)

    const [claimOtherProgram] = useMutation(CLAIM_OTHER_PROGRAM, {
        onCompleted: () => {
            updateState()
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 5000)
        },
        onError: () => {
            toast.error('Failed to claim otherProgram')
        },
    })
    return (
        <>
            {showConfetti && <Confetti />}

            <div className="w-full md:w-[45%]  lg:w-[30%]">
                <Card
                    clickable
                    className="hover:shadow-lg transition duration-150 ease-in-out"
                    onClick={(e) => console.log('Card Clickable', e)}
                >
                    <div className="flex">
                        <h5>{otherProgram.title}</h5>
                    </div>
                    <p className="mt-2 mb-2">
                        {otherProgram.description?.substring(0, 38)}...
                    </p>
                    <div className="flex gap-4 mt-2 justify-between items-center">
                        <Button
                            className="text-xs"
                            size="xs"
                            style={{
                                color: 'white', // Default text color
                                backgroundColor: `${otherProgram.category?.color || 'transparent'}cc`, // Default background color
                                // background opacity to 0.2
                            }}
                            onMouseEnter={(e) => {
                                ; (
                                    e.target as HTMLElement
                                ).style.backgroundColor = 'white'
                                    ; (e.target as HTMLElement).style.color =
                                        otherProgram.category?.color || 'black'
                                    ; (
                                        e.target as HTMLElement
                                    ).style.borderColor =
                                        `${otherProgram.category?.color || 'transparent'}cc`
                                    ; (e.target as HTMLElement).style.boxShadow =
                                        `0 0 0 1px ${otherProgram.category?.color || 'transparent'}`
                            }}
                            onMouseLeave={(e) => {
                                ; (
                                    e.target as HTMLElement
                                ).style.backgroundColor =
                                    `${otherProgram.category?.color || 'transparent'}cc`
                                    ; (e.target as HTMLElement).style.color =
                                        'white'
                            }}
                        >
                            {otherProgram.category?.title}
                        </Button>
                        <div className="flex gap-2">
                            {(() => {
                                if (otherProgram) {
                                    // Pending Button
                                    if (
                                        !otherProgram.verified &&
                                        !otherProgram.claimed
                                    ) {
                                        return (
                                            <Button
                                                className="text-sm"
                                                size="xs"
                                                variant="plain"
                                            >
                                                Pending
                                            </Button>
                                        )
                                    }

                                    // Claim Button
                                    if (!otherProgram.claimed) {
                                        return (
                                            <Button
                                                onClick={() => {
                                                    setClaimLoading(
                                                        true,
                                                    )
                                                    claimOtherProgram(
                                                        {
                                                            variables: {
                                                                id: otherProgram.id,
                                                            },
                                                        },
                                                    ).finally(() =>
                                                        setClaimLoading(
                                                            false,
                                                        ),
                                                    )
                                                }}
                                                className="text-sm"
                                                size="xs"
                                                variant="solid"
                                                loading={claimLoading}
                                            >
                                                {claimLoading
                                                    ? 'Claiming'
                                                    : 'Claim'}
                                            </Button>
                                        )
                                    }

                                    // Claimed Button
                                    if (otherProgram.claimed) {
                                        return (
                                            <Button
                                                disabled
                                                className="font-medium cursor-not-allowed"
                                                size="xs"
                                                variant="solid"
                                            >
                                                Claimed
                                            </Button>
                                        )
                                    }
                                }
                                return null; // Fallback to null if no valid otherProgram condition
                            })()}
                        </div>

                    </div>
                </Card>
            </div>
        </>
    )
}

export default OtherProgramCard
