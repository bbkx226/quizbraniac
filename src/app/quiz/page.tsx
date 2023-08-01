import React from 'react'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import QuizCreation from '@/components/QuizCreation'

type Props = {}

export const metadata = {
    title: "Quiz | QuizBraniac",
}

const QuizPage = async (props: Props) => {
    const session = await getAuthSession()
    if(!session?.user) {
        return redirect('/')
    }
  return (
    <QuizCreation />
  )
}

export default QuizPage