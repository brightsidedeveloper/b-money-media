'use client'

import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

export default function LandingNavbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className='p-4 bg-transparent flex items-center justify-between'>
      <Link href='/' className='flex items-center gap-2'>
        <div className='relative w-12 h-12'>
          <Image fill alt='Logo' src='/logo.png' />
        </div>
        <h1
          className={cn(
            'text-[2rem] font-bold text-white',
            montserrat.className
          )}
        >
          X2
        </h1>
      </Link>
      <div className='flex items-center gap-x-2'>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button className='rounded-full bg-[#d26cbf] text-white'>
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
