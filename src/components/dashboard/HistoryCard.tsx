'use client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { FolderClock } from 'lucide-react'
import { useRouter } from 'next/navigation';

type Props = {}

const HistoryCard = (props: Props) => {
    const router = useRouter()
  return (
    <Card className='hover:cursor-pointer hover:opacity-75' onClick={()=>router.push('/history')}>
        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-2xl font-bold'>
                Time Travel~
            </CardTitle>
            <FolderClock size={28} strokeWidth={2.5}/>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                Relive Past Quiz Triumphs and Trials with History Viewing.
            </p>
        </CardContent>
    </Card>
  )
}

export default HistoryCard