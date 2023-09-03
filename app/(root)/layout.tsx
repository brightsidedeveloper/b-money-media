import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import '../globals.css'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Bottombar from '@/components/shared/Bottombar'
import RightSidebar from '@/components/shared/RightSidebar'
import Topbar from '@/components/shared/Topbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X2 | Better than Meta',
  description: 'A Next.js 13 Practice Project',
  manifest: '/manifest.json',
  themeColor: '#121417',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'X2',
    startupImage: [
      '/apple-splash/iphone12max.png',
      {
        url: '/apple-splash/iphone12max.png',
        media: '(device-width: 1284px) and (device-height: 2778px)',
      },
    ],
  },
  viewport:
    'width=device-width, height=device-height, initial-scale:1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
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
        </body>
      </html>
    </ClerkProvider>
  )
}
