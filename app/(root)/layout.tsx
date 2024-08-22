import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "VizChat",
  description: "A video conferencing application",
  verification:{
    google: "oKXqnPx7kozZF3XvZCf07H4hefcb_9EBH3bAfIUUPkU"
  },
  authors:{
    name : "ASHUTOSH PAWAR",
    url : "ashutoshpawar.live"
  },
  icons:{
    icon:'/icons/logo.svg'
  }
};

const RootLayout = ({children}: {children : ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout