import { Avatar } from '@/components/ui'
import classNames from '@/utils/classNames'
import React, { useState } from 'react'

interface ProfileAvatarProps {
    src?: string
    alt: string
    className?: string
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
    src,
    alt,
    className = '',
}) => {
    const [isImageError, setIsImageError] = useState(false)

    // Extract the first letter from the alt text
    const initial = alt.trim().charAt(0).toUpperCase()

    return (
        <div
            className={`relative flex items-center justify-center w-8 h-8  rounded-full  text-base font-bold bg-gradient-to-r from-primary-mild to-primary-deep text-neutral ${className}`}
        >
            {src && !isImageError ? (
                  <img
                  src={src}
                  alt={alt}
                  className="w-full h-full rounded-full object-cover"
                  onError={() => setIsImageError(true)}
                />
            ) : (
                <span>{initial}</span>
            )}
        </div>
    )
}

export default ProfileAvatar
