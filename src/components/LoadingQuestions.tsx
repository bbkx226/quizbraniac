
import React from 'react'
import Image from "next/image"
import { Progress } from './ui/progress'

type Props = {
  finished: boolean
}

const loadingTexts = [
  "Preparing to embark on an epic adventure...",
  "Harnessing the power of AI to bring you the best experience.",
  "Assembling digital wonders for your delight.",
  "Loading awesomeness... Patience is a virtue!",
  "Gathering thoughts and weaving them into words.",
  "Infinite possibilities are just moments away.",
  "Loading creativity module... Firing up the imagination engines!",
  "Generating knowledge from the depths of cyberspace.",
  "Unraveling the mysteries of the universe... Almost there!",
  "Calibrating quantum circuits for mind-bending responses.",
  "Reticulating splines... Stay tuned for greatness!",
  "Loading pixels and dreams to create a mesmerizing experience.",
  "Spinning up the servers to bring you magic in bytes.",
  "Venturing into the digital realm for your pleasure.",
  "Analyzing data from the cosmos to enrich your journey.",
  "Bringing the future to your screen, one line at a time.",
  "Loading the arsenal of knowledge to fuel your curiosity.",
  "Preparing to unfold a story that will captivate your mind.",
  "Transmitting ideas from the collective consciousness.",
  "Initializing the engine of imagination... Brace for impact!",
]
const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(0)
  const [loadingText, setLoadingtext] = React.useState(loadingTexts[0])
  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setLoadingtext(loadingTexts[randomIndex])
    }, 2000)
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
      <h1 className='mt-2 text-xl'>{loadingText}</h1>
    </div>
  )
}

export default LoadingQuestions