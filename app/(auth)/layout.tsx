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
        <body className={`${inter.className} bg-dark-1 `}>
          <div className='w-full h-full min-h-screen flex items-center justify-center'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
