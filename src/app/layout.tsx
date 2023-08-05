import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuizBraniac',
  description: 'Challenge your knowledge and have fun with QuizBraniac, the top destination for exciting quizzes and mind-boggling trivia. Get ready for an unforgettable quiz adventure!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/quizbraniac.png" />
      </head>
      <body className={cn(inter.className, 'antialiased min-h-screen pt-16')}>
        <Providers>          
          <Navbar />
          {children}
          <Toaster />
        </Providers>  
      </body>
    </html>
  )
}
