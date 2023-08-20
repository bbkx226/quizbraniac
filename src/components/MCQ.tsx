'use client'

import React from 'react'
import { Game, Question } from '@prisma/client'
import { BarChart, ChevronRight, Loader2, Timer } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button, buttonVariants } from './ui/button'
import MCQCounter from './MCQCounter'
import { useMutation } from '@tanstack/react-query'
import { checkAnswerSchema } from '@/schemas/form/quiz'
import axios from 'axios'
import { z } from 'zod'
import { useToast } from './ui/use-toast'
import Link from 'next/link'
import { cn, formatTimeDelta } from '@/lib/utils'
import { differenceInSeconds } from 'date-fns'

type Props = {
    game: Game & {questions: Pick<Question, 'id' | 'options' | 'question'>[]}
}

const MCQ = ({ game }: Props) => {
    const [questionIndex, setQuestionIndex] = React.useState(0)
    const [selectedChoice, setSelectedChoice] = React.useState<number>(0)
    const [correctAnswers, setCorrectAnswers] = React.useState<number>(0)
    const [wrongAnswers, setWrongAnswers] = React.useState<number>(0)
    const [hasEnded, setHasEnded] = React.useState<boolean>(false)
    const [now, setNow] = React.useState(new Date())
    const { toast }  = useToast()

    // This prevents re-calculating the current question on every render.
    // Benefits:
    // Avoids expensive recalculations on each render
    // Caches the value until dependencies change
    // Improves performance in components that select from data
    const currentQuestion = React.useMemo(() => { // using the useMemo hook to memorize the current question object from an array of questions
        return game.questions[questionIndex]
    }, [questionIndex, game.questions])

    const options = React.useMemo(() => {
        if(!currentQuestion) return []
        if(!currentQuestion.options) return []
        return JSON.parse(currentQuestion.options as string) as string[]
    }, [currentQuestion])

    const {mutate: checkAnswer, isLoading: isChecking} = useMutation({
        mutationFn: async () => {
            const payload: z.infer<typeof checkAnswerSchema> = {
                questionId: currentQuestion.id,
                userAnswer: options[selectedChoice],
            }
            const response = await axios.post('/api/checkAnswer', payload)
            return response.data
        }
    })

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!hasEnded) {
                setNow(new Date())
            }
        }, 1000)
        return () => { clearInterval(interval) }
    }, [hasEnded])

    // The key difference between useCallback and useMemo in React is:
    // useCallback caches a function, while useMemo caches the result of a function.
    const handleNext = React.useCallback(() => { // useCallback hook to memoize the handleNext function to avoid re-creating it on every render.
        if (isChecking) return;

        checkAnswer(undefined, {
            onSuccess: ({ isCorrect }) => {
                if (isCorrect) {
                    toast({
                        title: "Correct!",
                        description: 'Correct answer',
                        variant: 'success',
                    })
                    setCorrectAnswers((prev) => prev + 1)
                } else {
                    toast({
                        title: "Incorrect!",
                        description: 'Incorrect answer',
                        variant: 'destructive',
                    })
                    setWrongAnswers((prev) => prev + 1)
                }
                if (questionIndex === game.questions.length - 1) {
                    setHasEnded(true)
                    return;
                }
                setQuestionIndex((prev) => prev + 1)
            }
        })

    }, [checkAnswer, questionIndex, toast, isChecking, game.questions.length])

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key == '1') {
                setSelectedChoice(0)
            } else if (event.key == '2') {
                setSelectedChoice(1)
            } else if (event.key == '3') {
                setSelectedChoice(2)
            } else if (event.key == '4') {
                setSelectedChoice(3)
            } else if (event.key == 'Enter') {
                handleNext()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }

    }, [handleNext])

    if (hasEnded) {
        return (
            <div className='absolute flex flex-col justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap'>
                    You completed in {" "}
                    {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
                </div>
                <Link 
                    href={`/statistics/${game.id}`}
                    className={cn(buttonVariants({ size: "lg" }), "mt-2")}
                >
                    View Statistics <BarChart className='w-4 h-4 ml-2'/>
                </Link>
            </div>
        )
    }

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
            <div className='flex flex-row justify-between'>
                <div className="flex flex-col">
                    {/* topic */}
                    <p>
                        <span className='mr-2 text-slate-400'>Topic</span> &nbsp;
                        <span className='px-2 py-1 text-white rounded-lg bg-slate-800'>
                            {game.topic}
                        </span>
                    </p>
                    <div className='flex self-start mt-3 text-slate-400'>
                        <Timer className="mr-2" />
                        {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
                    </div>
                </div>
                <MCQCounter correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
            </div>
            <Card className="w-full mt-4">
                <CardHeader className="flex flex-row items-center">
                    {/* divide-y: Add borders between stacked elements */}
                    <CardTitle className="mr-4 text-center divide-y divide-zinc-600/50">
                        <div>{questionIndex + 1}</div>
                        <div className='text-base text-slate-400'>
                            {game.questions.length}
                        </div>
                    </CardTitle>
                    {/* flex-grow: Use grow to allow a flex item to grow to fill any available space */}
                    <CardDescription className='flex-grow text-lg'>
                        {currentQuestion?.question}
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="flex flex-col items-center justify-center w-full mt-4">
                {options.map((option, index) => {
                    return (
                        <Button 
                            key={index} 
                            className='justify-start w-full py-8 mb-4'
                            variant={selectedChoice === index ? 'default' : 'secondary'}
                            onClick={() => setSelectedChoice(index)}
                        >
                            <div className="flex items-center justify-start">
                                <div className="p-2 px-3 mr-5 border rounded-md">
                                    {index + 1}
                                </div>
                                <div className="text-start">{option}</div>
                            </div>
                        </Button>
                    )
                })}
                <Button 
                    className='mt-2'
                    disabled={isChecking}
                    onClick={() => {
                        handleNext()
                    }}
                >
                    {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
                    Next <ChevronRight className='w-4 h-4 ml-2'/>
                </Button>
            </div>
        </div>
    )
}

export default MCQ