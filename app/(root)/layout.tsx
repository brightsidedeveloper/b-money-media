import React from 'react'
import type { Metadata } from 'next'

import '../globals.css'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Bottombar from '@/components/shared/Bottombar'
import RightSidebar from '@/components/shared/RightSidebar'
import Topbar from '@/components/shared/Topbar'

export const metadata: Metadata = {
  title: 'X2 | Better than Meta',
  description: 'A Next.js 13 Practice Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Topbar />

      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <div className='w-full max-w-4xl'>{children}</div>
        </section>
        {/* @ts-ignore */}
        <RightSidebar />
      </main>

      <Bottombar />
    </>
  )
}
