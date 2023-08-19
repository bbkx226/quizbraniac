import { getAuthSession } from '@/lib/nextauth'
import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'
import UserAccountNav from './UserAccountNav'
import { ThemeToggle } from './ThemeToggle'

const Navbar = async () => {
    const session = await getAuthSession()
    return (
        // fixed: Sets the element to have a fixed position, meaning it will stay in view as the page scrolls
        // inset-x-0: Sets the left and right inset to 0, meaning the element will be full width and stretch to the edges of the viewport.
        // z-[10]: Sets the z-index to 10, placing it above other elements on the z-axis.
        // h-fit: Sets the height to fit the content.
        // border-b - Adds a bottom border.
        <div className='fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2'>
            {/* 
                h-full - Sets the height to 100% of the parent element.
                mx-auto - Applies margin auto horizontally, centering the element.
                max-w-7xl - Sets a max-width of 80rem (7xl), keeping it constrained to a readable width.
            */}
            <div className='flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl'>
                {/* Logo */}
                <Link href={'/'} className='flex items-center'>
                    <p className='rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white'>
                        QuizBraniac
                    </p>
                </Link>
                <div className='flex items-center'>
                    <ThemeToggle className='mr-4'/>
                    {session?.user ? (
                        <UserAccountNav user={session.user} />
                    ):(
                        <SignInButton text='Sign In'/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar