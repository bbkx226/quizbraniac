'use client'

import React from 'react'
import type { User } from 'next-auth'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { LogOut } from "lucide-react";
import UserAvatar from './UserAvatar'

type Props = { 
    // Pick means it will create a new type with only the specified keys.
    // using Pick to create a narrower user prop shape with only the needed properties from the full User type. 
    // This avoids passing unnecessary props to the component.
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
                        // Use truncate to truncate overflowing text with an ellipsis (…) if needed.
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
            {/* 
            There are a few reasons why onSelect is sometimes used instead of onClick in React:
                1. Semantics - onSelect implies an option being "selected" rather than a generic "click" action. This can make the code more readable.
                2. Accessibility - onSelect works with keyboard selection of elements, not just clicks. This makes it more accessible.
                3. Types of elements - onSelect works nicely on <option> elements in a <select> dropdown. onClick may not fire reliably on option elements.
                4. Preventing default - onSelect will not trigger the default browser behavior like following a link. With onClick you'd need e.preventDefault().
                5. Synthetic events - React's onSelect uses a synthetic event that's consistent across browsers. The native onClick event can have minor browser differences. 
            */}
            {/* 
                When an event occurs on an element, like clicking a link, the browser will take some default action. 
                For links, the default action is to navigate to the link url.
                e.preventDefault() stops this default behavior from happening. 
            */}
            <DropdownMenuItem 
                onSelect={(e)=>{
                    e.preventDefault()
                    signOut().catch(console.error)
                }}
                className='text-red-600 cursor-pointer'
            >
                Sign out <LogOut className='w-4 h-4 ml-2'/>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav