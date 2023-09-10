import MediaRoom from '@/components/MediaRoom'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await currentUser()
  if (!user) redirect('/landing')

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <div className='fixed bg-[#111111] inset-0 z-50'>
      <Link href='/' className='absolute w-10 h-10 z-[51] top-5 left-5'>
        <Image
          src='/assets/arrow-left.svg'
          alt='close'
          width={24}
          height={24}
          className='cursor-pointer'
        />
      </Link>
      <MediaRoom user={userInfo} video audio />
    </div>
  )
}
