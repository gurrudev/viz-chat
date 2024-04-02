import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "VizChat",
  description: "A video conferencing application",
  icons:{
    icon:'/icons/logo.svg'
  }
};

const SignUpPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
        <SignUp/>
    </main>
  )
}

export default SignUpPage