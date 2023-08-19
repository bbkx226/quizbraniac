'use client' // Runs this code only on client side.

import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

type Props = { // Defines Props interface for component props.
    text: string
}

const SignInButton = ({ text }: Props) => {
  return (
    // Using signIn() directly would call it on every render.
    // The arrow function () => {signIn()} is only invoked when clicked.

    // the arrow function avoids:
    // Immediately invoking on render
    // Losing component context
    // Needing to pass args to signIn()
    <Button onClick={()=>{ // Button click calls next-auth signIn function.
        signIn('google').catch(console.error) // initiates Google OAuth login flow, signIn returns promise to handle success/failure.
    }}>
        {text}
    </Button>
  )
}

export default SignInButton