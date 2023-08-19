'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { HopOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

const QuizMeCard = () => {
    const router = useRouter() // Initializes the router object
  return (
    <Card className='hover:cursor-pointer hover:opacity-75' onClick={()=> {
        router.push('/quiz') // navigates to the given page programmatically
    }}>
        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-2xl font-bold'>Quiz-o-mania!</CardTitle>
            <HopOff size={28} strokeWidth={2.5}/>
        </CardHeader>
        <CardContent>
            {/* -muted-foreground: user-defined css-style in globals.css */}
            <p className='text-sm text-muted-foreground'>
                Get ready to test your wits with mind-bending quizzes!
            </p>
        </CardContent>
    </Card>
  )
}

export default QuizMeCard