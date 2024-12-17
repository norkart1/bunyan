import { Dialog } from '@/components/ui'
import React from 'react'

const Edit = () => {
  return (
    <Dialog
            isOpen={false}
            width={600}
            // onClose={handleClose}
            // onRequestClose={handleClose}
        >
            <div className="p-4">
                <p className="text-lg m-4 font-bold uppercase">View Post</p>
            <img
                src="https://via.placeholder.com/800x400"
                alt="placeholder"
                className="w-full h-auto rounded-lg"
            />
            <div className='text-3xl font-bold mt-4 text-'>
                This is a Title
                <p className="!text-lg font-normal">
                    This is a subtitle
                </p>
            </div>
                {/* 24 likes */}
                <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-1">
                        <p className="text-lg font-semibold">24 likes</p>
                        <div className="rounded-full bg-current w-4 h-4"> </div>
                        <p>22 Nov 3034</p>
                    </div>
                    </div>
            </div>
        </Dialog>
  )
}

export default Edit