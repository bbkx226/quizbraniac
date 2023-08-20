import React from 'react'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import QuizCreation from '@/components/QuizCreation'

type Props = {
  searchParams: { // searchParams itself is defined as an object that can have an optional property called topic which is a string.
    topic?: string // topic is an optional property on searchParams
  }
}

export const metadata = {
    title: "Quiz | QuizBraniac",
}

const QuizPage = async ({ searchParams }: Props) => {
    const session = await getAuthSession()
    if(!session?.user) return redirect('/')
  return (
    <QuizCreation topicParam={searchParams.topic ?? ""}/> // The ?? operator returns the left hand side if it's not null or undefined, otherwise it returns the right hand side default value.
  )
}

export default QuizPage