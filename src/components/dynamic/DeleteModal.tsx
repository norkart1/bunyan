import React, { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { Button, Spinner, Tag } from '@/components/ui'
import { LuAlertTriangle } from 'react-icons/lu'

interface Props {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    title: string
    description: string
    toDeleteId?: number
    toDeleteIds?: number[]
    deleteItem?: (id: number) => void
    deleteItems?: (ids: number[]) => void
    deleteLoading: boolean
}

const DeleteModal = ({
    isOpen,
    setIsOpen,
    title,
    description,
    toDeleteId,
    toDeleteIds,
    deleteItem,
    deleteItems,
    deleteLoading
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
                    <LuAlertTriangle
                        size={40}
                        className="self-center text-red-500 text-5xl bg-red-100 rounded-full p-2"
                    />
                    <div className="ml-4">
                        <h5 className="mb-2">{title}</h5>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="flex justify-end bg-gray-100 mt-6 p-2 rounded-md">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={() => setIsOpen(false)}
                        variant="default"
                        size="sm"
                    >
                        Cancel
                    </Button>
                    {
                        deleteLoading ? (
                            <Button
                                variant="solid"
                                size="sm"
                                className="flex items-center gap-2"
                                disabled
                            >
                                <Spinner className='text-white' />
                                <p>Deleting...</p>
                            </Button>
                        ) : (
                            <Button
                                variant="solid"
                                size="sm"
                                className="ml-2"
                                onClick={() => toDeleteId && deleteItem ? deleteItem(toDeleteId) : toDeleteIds && deleteItems ? deleteItems(toDeleteIds) : null}
                            >
                                Confirm
                            </Button>
                        )
                    }
                </div>
            </div>
        </Dialog>
    )
}

export default DeleteModal
