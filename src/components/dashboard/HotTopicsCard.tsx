import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Flame } from 'lucide-react'
import CustomWordCloud from '@/components/CustomWordCloud';
import { prisma } from '@/lib/db';

type Props = {}

const HotTopicsCard = async (props: Props) => {
    const topics = await prisma.topic_count.findMany({})
    const formattedTopics = topics.map(topic => {
        return {
            text: topic.topic,
            value: topic.count
        }
    })
  return (
    <Card className='col-span-4'>
        <CardHeader>
            <CardTitle className='text-2xl font-bold flex flex-row items-center justify-between pb-2 space-y-0'>
                Trending
                <Flame size={28} strokeWidth={2.5}/>
            </CardTitle>
            <CardDescription>
                 Ignite Your Curiosity - Click on Any Topic to Blaze Through a Quiz!
            </CardDescription>
            
        </CardHeader>

        <CardContent className="pl-2">
            <CustomWordCloud formattedTopics={formattedTopics}/>
        </CardContent>
    </Card>
  )
}

export default HotTopicsCard