import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Award, Trophy } from 'lucide-react'

type Props = {
    accuracy: number
}

const ResultsCard = ({ accuracy } : Props) => {
  return (
    // Use the col-span-{n} utilities to make an element span n columns.
    <Card className='md:col-span-7'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-7'>
            <CardTitle className='text-2xl font-bold'>
                Results
            </CardTitle>
            <Award />
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center h-3/5'>
            {accuracy > 75 ? (
                <>
                    <Trophy className='mr-4' stroke='gold' size={50}/>
                    <div className='flex flex-col text-2xl font-semibold text-yellow-400'>
                        <span>Impressive!</span>
                        <span className='text-sm text-center text-black opacity-50'>
                            {"> 75% accuracy"}
                        </span>
                    </div>
                </>
            ) : accuracy > 25 ? (
                <>
                    <Trophy className='mr-4' stroke='silver' size={50}/>
                    <div className='flex flex-col text-2xl font-semibold text-slate-500'>
                        <span>Good Job!</span>
                        <span className='text-sm text-center text-black opacity-50'>
                            {"> 25% accuracy"}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <Trophy className='mr-4' stroke='bronze' size={50}/>
                    <div className='flex flex-col text-2xl font-semibold text-amber-700'>
                        <span>Nice Try!</span>
                        <span className='text-sm text-center text-black opacity-50'>
                            {"< 25% accuracy"}
                        </span>
                    </div>
                </>
            )}
        </CardContent>
    </Card>
  )
}

export default ResultsCard