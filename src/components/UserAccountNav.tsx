'use client'

import React from 'react'
import type { User } from 'next-auth'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { LogOut } from "lucide-react";
import UserAvatar from './UserAvatar'

type Props = {
    user: Pick<User, 'name' | 'email' | 'image'>
}

const UserAccountNav = ({ user }: Props) => {

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
                <div className='flex flex-col space-y-1 leading-none'>
                    {user.name && <p className='font-medium'>{user.name}</p>}
                    {user.email && (
                        <p className='w-[200px] truncate text-sm text-zinc-700'>
                            {user.email}
                        </p>
                    )}
                </div>
            </div>

            {/* <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href='/'>Meow</Link>
            </DropdownMenuItem> */}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem 
                onSelect={(e)=>{
                    e.preventDefault()
                    signOut().catch(console.error)
                }}
                className='text-red-600 cursor-pointer'
            >
                Sign out<LogOut className='w-4 h-4 ml-2 '/>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav