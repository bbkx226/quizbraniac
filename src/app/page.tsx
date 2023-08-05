import SignInButton from '@/components/SignInButton';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getAuthSession()
  if (session?.user) {
    redirect('/dashboard')
  }
  
  return (
  <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to QuizBraniac!</CardTitle>
          <CardDescription>
            QuizBraniac is a quiz app that allows you to create and play quizzes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In with Google!"/>
        </CardContent>
      </Card>
  </div>
  )
}