import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] }) // Specifies that you want to load the Inter font with only the Latin character subset.

// Used for search engine optimization (SEO) and for providing context about your web page when it's shared on social media platforms
export const metadata: Metadata = {
  title: 'QuizBraniac',
  description: 'Challenge your knowledge and have fun with QuizBraniac, the top destination for exciting quizzes and mind-boggling trivia. Get ready for an unforgettable quiz adventure!',
}

// children: React.ReactNode - Render any JSX elements or components that are provided as children when using the component
// In ReactJS with TypeScript, ReactNode is a type that represents a React element, an array of React elements, or a string, number, or boolean.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/quizbraniac.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Brandon Ban Kai Xian" />
        <meta property="og:site_name" content="Brandon Ban" />
        <meta property="og:title" content="QuizBraniac - AI Quizzes Generator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/quizbraniacbg.png" />
        <meta property="og:image:width" content="125" />
        <meta property="og:image:height" content="125" />
        <meta property="og:description" 
        content=' "Hi there! Just wanted to let you know that this project was created by an undergraduate student who is still learning the ropes when it comes to programming. Feel free to take a look around and check out his work!" ' />
        <meta property="og:url" content="https://quizbraniac.vercel.app/" />
        <meta property="og:determiner" content="the" />
        <meta property="og:locale" content="ms_MY" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="zh_SG" />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta property="og:locale:alternate" content="fr_FR" />
        <meta property="og:locale:alternate" content="es_ES" /> 
      </head>
      {/* inter.className is a dynamic class name, this line of code combines these class names to create a single string that can be applied as a className to a React element. */}
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
