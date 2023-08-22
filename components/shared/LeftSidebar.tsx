'use client'

import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/clerk-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function LeftSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map(link => {
          const isActive =
            (pathname.includes(link.route) && link.route !== '/') ||
            pathname === link.route
          return (
            <Link
              key={link.label}
              href={link.route}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
            >
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={link.label}
              />
              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>
      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image
                src='/assets/logout.svg'
                width={24}
                height={24}
                alt='signout'
              />
              <p className='text-light-2 max-lg:hidden'>Sign Out</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}
