import { CardDescription } from '@/components/ui/card'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type Props = {}

const RecentActivities = (props: Props) => {
  return (
    <Card className='col-span-4 lg:col-span-3'>
        <CardHeader>
            <CardTitle className="text-2xl font-bold">
                Recent Activities
            </CardTitle>
            <CardDescription>
                You have no recent activities.
            </CardDescription>
        </CardHeader>
        <CardContent className='max-h-[580px] overflow-scroll'>
            Histories
        </CardContent>
    </Card>
  )
}

export default RecentActivities