import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useRouter } from 'next/navigation';
import CustomWordCloud from '@/components/ui/CustomWordCloud';

type Props = {}

const HotTopicsCard = (props: Props) => {
  return (
    <Card className='col-span-4'>
        <CardHeader>
            <CardTitle className='text-2xl font-bold'>
                Hot Topics
            </CardTitle>
            <CardDescription>
                Click on a topic to start a quiz on it!
            </CardDescription>
        </CardHeader>

        <CardContent className="pl-2">
            <CustomWordCloud />
        </CardContent>
    </Card>
  )
}

export default HotTopicsCard