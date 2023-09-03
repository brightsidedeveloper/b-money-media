'use client'

import { useAuth } from '@clerk/nextjs'
import TypewriterComponent from 'typewriter-effect'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function LandingHero() {
  const { isSignedIn } = useAuth()

  return (
    <div className='text-white font-bold py-36 text-center space-y-5'>
      <div className='text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] space-y-5 font-extrabold'>
        <h1>The Best Social Media for</h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          <TypewriterComponent
            options={{
              strings: [
                'Posting fire.',
                'Clowing People.',
                'Saying funny stuff.',
                'Sharing your thoughts.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-[0.875rem] md:text-[1.25rem] font-light text-zinc-400'>
        {
          "BrightSide's newest media that doesn't have the infrustructure to take your data."
        }
      </div>
      <div>
        <Link href={isSignedIn ? '/' : '/sign-up'}>
          <Button className='bg-[#1d1e20] md:text-lg p-4 md:p-6 rounded-full font-semibold'>
            {isSignedIn ? 'Enter Home' : 'Create an Account'}
          </Button>
        </Link>
      </div>
    </div>
  )
}
