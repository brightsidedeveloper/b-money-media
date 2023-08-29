import Link from 'next/link'
import Image from 'next/image'
import CrownUser from '../forms/CrownUser'

interface Props {
  accountId: string
  authUserId: string
  name: string
  username: string
  crowned?: boolean
  imgUrl: string
  bio: string
  type?: string
  isAdmin?: boolean
  path?: string
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  crowned,
  imgUrl,
  bio,
  type,
  isAdmin,
  path,
}: Props) {
  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            {crowned && (
              <Image
                src='/assets/crown.png'
                alt='crown'
                width={24}
                height={24}
                className='rotate-[20deg] absolute -top-2 right-1 z-10'
              />
            )}
            <Image
              src={imgUrl}
              alt='logo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>
        <div className='flex gap-2'>
          {isAdmin && type !== 'Community' && (
            <CrownUser username={username} crowned={crowned} path={path} />
          )}
          {accountId === authUserId && type !== 'Community' && (
            <Link href='/profile/edit'>
              <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
                <Image
                  src='/assets/edit.svg'
                  alt='logout'
                  width={16}
                  height={16}
                />

                <p className='text-light-2 max-sm:hidden'>Edit</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  )
}

export default ProfileHeader
