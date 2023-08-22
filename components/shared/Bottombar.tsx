'use client'

import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Bottombar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLinks.map(link => {
          const isActive =
            (pathname.includes(link.route) && link.route !== '/') ||
            pathname === link.route
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && 'bg-primary-500'}`}
            >
              <Image
                src={link.imgURL}
                width={24}
                height={24}
                alt={link.label}
              />
              <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
