import React from 'react'
import { User } from 'next-auth'
import { Avatar } from './ui/avatar'
import Image from 'next/image'
import { AvatarFallback } from '@radix-ui/react-avatar'

type Props = {
    user: Pick<User, 'name' | 'image'>
}

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
        {user.image ? (
            // "relative" positioning means the element stays fixed in place, while other elements can move around it
            // aspect-square - Sets the aspect ratio of the element to be a perfect square
            <div className='relative w-full h-full aspect-square'>
                {/* 
                    fill - This stretches the image to fill the width and height of its container. 
                    referrerPolicy='no-referrer' - Sets the referrer policy to not send the webpage referrer when fetching the image.
                    referrerPolicy can prevent leaking the webpage URL to third-party image servers
                    The Image component handles optimizing and lazy loading the image for efficient performance
                */}
                <Image 
                    fill 
                    src={user.image}
                    alt='profile image'
                    referrerPolicy='no-referrer'
                />
            </div>
        ) : (
            <AvatarFallback>
                <span className='sr-only'>{user?.name}</span>
            </AvatarFallback>
        )}
    </Avatar>
  )
}

export default UserAvatar