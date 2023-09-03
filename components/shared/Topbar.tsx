import { SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

function Topbar() {
  return (
    <nav className='topbar'>
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/logo.png' alt='logo' width={28} height={28} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>X2</p>
      </Link>

      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Topbar
