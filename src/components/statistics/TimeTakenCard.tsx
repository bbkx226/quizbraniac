import { formatTimeDelta } from '@/lib/utils'
import { Hourglass } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { differenceInSeconds } from 'date-fns'

type Props = {
    timeEnded: Date
    timeStarted: Date
}

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => {

  return (
    <Card className='md:col-span-4'>
        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-2xl font-bold'>
                Speedy Stats
            </CardTitle>
            <Hourglass />
        </CardHeader>
        <CardContent>
            <div className='text-sm font-medium'>
                {formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))}
            </div>
        </CardContent>
    </Card>
  )
}

export default TimeTakenCard