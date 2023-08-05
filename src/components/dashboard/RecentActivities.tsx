import { CardDescription } from '@/components/ui/card'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import HistoryComponent from '../HistoryComponent'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

type Props = {}

const RecentActivities = async (props: Props) => {
    const session = await getAuthSession()
    if(!session?.user) {
        return redirect('/')
    }
    const gameCount = await prisma.game.count({
        where: {
            userId: session.user.id
        }
    })
  return (
    <Card className='col-span-4 lg:col-span-3'>
        <CardHeader>
            <CardTitle className="text-2xl font-bold">
                Recent Activities
            </CardTitle>
            <CardDescription>
                You have played a total of {gameCount} games.
            </CardDescription>
        </CardHeader>
        <CardContent className='max-h-[580px] overflow-scroll'>
            <HistoryComponent limit={10} userId={session.user.id}/>
        </CardContent>
    </Card>
  )
}

export default RecentActivities