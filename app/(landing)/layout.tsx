import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X2 | Landing',
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
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        </head>
        <body className={`${inter.className} bg-dark-1 `}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
