import React, { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { Button, Tag } from '@/components/ui'

interface Props {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    title: string
    children: React.ReactNode
    status?: string
    statusColor?: Record<string, string>
}

const ViewModal = ({
    isOpen,
    setIsOpen,
    title,
    children,
    status,
    statusColor,
}: Props) => {
    const onDialogClose = (e: MouseEvent) => {
        e.preventDefault()
        setIsOpen(false)
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <div className="flex flex-col h-full justify-between">
                <div className="flex">
                    <h5 className="mb-4">{title}</h5>
                    {status && (
                        <Tag
                            className={`${statusColor && statusColor[status]}  mb-4 ml-2`}
                        >
                            <span className="capitalize">{status}</span>
                        </Tag>
                    )}
                </div>
                <div className="max-h-80 overflow-hidden overflow-y-auto">
                    {children}
                </div>
                <div className="text-right mt-6">
                    <Button onClick={onDialogClose} variant="solid" size="sm">
                        Close
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default ViewModal
