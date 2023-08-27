import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X2 | Auth',
  description: 'A Next.js 13 Practice Project',
manifest: "/manifest.json",
  themeColor: "#121417",
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
        <body className={`${inter.className} bg-dark-1 `}>
          <div className='w-full h-full min-h-screen flex items-center justify-center'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
