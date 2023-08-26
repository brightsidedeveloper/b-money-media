import LandingContent from '@/components/landing/LandingContent'
import LandingHero from '@/components/landing/LandingHero'
import LandingNavbar from '@/components/landing/LandingNavbar'
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
