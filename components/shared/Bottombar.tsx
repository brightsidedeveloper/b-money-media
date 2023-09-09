'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { sidebarLinks } from '@/constants'

function Bottombar() {
  const pathname = usePathname()

  return (
    <section className='bottombar pb-12'>
      {pathname !== '/live-chat' && (
        <Link
          href='/create-thread'
          className='absolute p-5 top-[-5rem] bg-primary-500 right-2 rounded-full'
        >
          <Image src='/assets/create.svg' alt='create' width={24} height={24} />
        </Link>
      )}
      <div className='bottombar_container'>
        {sidebarLinks.map(link => {
          if (link.route === '/create-thread') return null
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && 'bg-primary-500'}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className='object-contain'
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

export default Bottombar
