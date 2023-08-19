import SignInButton from '@/components/SignInButton';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getAuthSession()
  if (session?.user) {
    redirect('/dashboard')
  }
  
  return (
  // The combined effect is that the element is centered horizontally and vertically within its parent
  <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to QuizBraniac, the Ultimate Quiz Adventure!</CardTitle>
          <CardDescription>
            Dive into the world of quizzes, where you can both <br />craft and conquer mind-boggling challenges!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In with Google!"/>
        </CardContent>
      </Card>
  </div>
  )
}