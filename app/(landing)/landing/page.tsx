import LandingContent from '@/components/landing/LandingContent'
import LandingHero from '@/components/LandingHero'
import LandingNavbar from '@/components/LandingNavbar'
import React from 'react'

export default function page() {
  return (
    <div className='h-full min-h-screen'>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  )
}
