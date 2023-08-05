
import React from 'react'
import Image from "next/image"
import { Progress } from './ui/progress'

type Props = {
  finished: boolean
}

const loadingTexts = [
  "Honey never spoils. Archaeologists found edible honey in ancient tombs.",
  "Octopuses have three hearts and blue blood.",
  "The Eiffel Tower grows up to 6 inches in summer due to heat expansion.",
  "A group of flamingos is called a 'flamboyance.'",
  "A day on Venus is longer than a year on Venus.",
  "The average cloud weighs about 1.1 million pounds.",
  "Bees need to visit 2 million flowers for one pound of honey.",
  "Polar bears have black skin underneath their white fur.",
  "Bananas are berries, but strawberries are not.",
  "A group of pugs is called a 'grumble.'",
  "Polar bears have black skin.",
  "A group of pugs is called a 'grumble.'",
  "The oldest known living tree is over 5,000 years old.",
  "A group of rhinos is called a 'crash.'",
  "The national animal of Scotland is the unicorn.",
  "Cows have best friends and can become stressed when separated.",
  "The dot over the letter 'i' is called a 'tittle.'",
  "Honeybees communicate with each other through dance.",
  "The name for a group of owls is a 'parliament.'",
  "Elephants are the only animals that can't jump.",
  "A group of kangaroos is called a 'mob.'",
  "Hippopotamus milk is pink.",
  "A flamingo can eat only when its head is upside down.",
  "A group of zebras is called a 'zeal.'"
]

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(0)
  const [loadingText, setLoadingtext] = React.useState(loadingTexts[0])
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setLoadingtext(loadingTexts[randomIndex])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (finished) return 100
        if (prev === 100) return  0
        if (Math.random() < 0.1) return prev + 2
        return prev+ 0.5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [finished])

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center'>
      <Image 
        src={'/loading.gif'}
        width={400}
        height={400}
        alt="loading animation"
      />
      <Progress value={progress} className='w-full mt-4'/>
      <h1 className='mt-2 text-xl'>Fun Fact: {loadingText}</h1>
    </div>
  )
}

export default LoadingQuestions