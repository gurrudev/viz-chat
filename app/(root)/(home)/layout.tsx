import Navbar from '@/components/ui/navbar'
import Sidebar from '@/components/ui/sidebar'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "VizChat",
    description: "A video conferencing application",
    icons:{
      icon:'/icons/logo.svg'
    }
  };

const HomeLayout = ({ children }: { children: ReactNode }) => {
    
    return (
        <main className='relative'>
            <Navbar/>
            <div className="flex">
                <Sidebar/>

                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default HomeLayout