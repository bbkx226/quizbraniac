'use client'
import { useTheme } from 'next-themes'
import { useRouter } from "next/navigation";
import React from 'react'
import D3WordCloud from 'react-d3-cloud'

type Props = {
  formattedTopics: { text: string, value: number }[]
}

// This has the effect of mapping the word value to a font size in a logarithmic way.
// Smaller values will map to smaller font sizes that grow slowly.
// Larger values will map to larger font sizes that grow more rapidly.
// The fontSizeMapper function returns this calculated font size.
const fontSizeMapper = (word: { value:number }) => { // It takes in a single parameter called word, which is an object with a value property that is a number.
    return Math.log2(word.value) * 5 + 16
}

const WordCloud = ({ formattedTopics }: Props) => {
    const theme = useTheme();
    const router = useRouter();
    return (
      <>
        <D3WordCloud
          data={formattedTopics}
          height={550}
          font="Times"
          fontSize={fontSizeMapper}
          rotate={0}
          padding={10}
          fill={theme.theme === "dark" ? "white" : "black"}
          onWordClick={(e, d) => {
            router.push("/quiz?topic=" + d.text);
          }}
        />
      </>
    );
  };
  
  export default WordCloud;