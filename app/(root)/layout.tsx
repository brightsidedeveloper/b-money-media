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
manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: 'X2',
    // startUpImage: [],
  },
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
        <head>
        <link rel="manifest" href="/mainfest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        </head>
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
