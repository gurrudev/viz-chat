import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './mobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link
        href={'/'}
        className='flex items-center gap-1'
      >

        <Image src={'/icons/logo.svg'}
          width={32} height={32} alt="viz-chat logo" />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>VizChat</p>
      </Link>

      <div className='flex gap-5'>
        {/* Clerk - User Management */}
        <div className='mt-1'>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar