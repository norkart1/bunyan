import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'

interface ImageDialogProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string
}

const ImageDialog = ({ isOpen, onClose, imageUrl }: ImageDialogProps) => {
    return (
        <Dialog
            isOpen={isOpen}
            width={900}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:max-w-[400px]">
                    <img
                        className="rounded-xl"
                        src={
                            'https://ecme-react.themenate.net/img/others/gallery/img-11.webp'
                        }
                        alt={
                            'https://ecme-react.themenate.net/img/others/gallery/img-11.webp'
                        }
                    />
                </div>
            </div>
        </Dialog>
    )
}

export default ImageDialog
