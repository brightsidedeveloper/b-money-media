import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
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

export default function layout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={`${inter.className} bg-dark-1 `}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
