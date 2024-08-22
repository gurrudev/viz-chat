import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "VizChat",
  description: "A video conferencing application",
  verification:{
    google: "Hz-JESTfNWJ5jkzLhLbecSpoN2zNwyUvG_aTa8rH7xY"
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