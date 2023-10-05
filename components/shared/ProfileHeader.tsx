import Link from 'next/link'
import Image from 'next/image'
import Abilities from '../forms/Abilities'
import { cn } from '@/lib/utils'
import FollowButton from '../forms/FollowButton'

interface Props {
  accountId: string
  authUserId: string
  name: string
  username: string
  crowned?: boolean
  abilities?: string[]
  imgUrl: string
  bio: string
  type?: string
  isAdmin?: boolean
  path?: string
  clownCount: number
  subscribers: string[]
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  abilities,
  bio,
  type,
  isAdmin,
  path,
  clownCount,
  subscribers,
}: Props) {
  return (
    <div className='flex w-full flex-col justify-start'>
      {isAdmin && <Abilities username={username} path={path} />}

      <div className='flex items-center flex-col gap-4'>
        <div className='flex items-center jusitify-between w-full'>
          <div className='flex items-center grow  gap-3'>
            <div className='relative h-20 w-20 object-cover'>
              {abilities?.includes('party-hat') ? (
                <Image
                  src='/assets/party-hat.png'
                  alt='crown'
                  width={38}
                  height={38}
                  className='rotate-[20deg] absolute -top-8 right-0 z-10'
                />
              ) : (
                abilities?.includes('crown') && (
                  <Image
                    src='/assets/crown.png'
                    alt='crown'
                    width={abilities?.includes('mega-crown') ? 72 : 38}
                    height={abilities?.includes('mega-crown') ? 72 : 38}
                    className={cn(
                      'rotate-[20deg] absolute -top-4 right-1 z-10',
                      abilities?.includes('mega-crown') && '-top-10 -right-3'
                    )}
                  />
                )
              )}
              <Image
                src={
                  abilities?.includes('clown') ? '/assets/clown.png' : imgUrl
                }
                alt='logo'
                fill
                className='rounded-full object-cover shadow-2xl'
              />
            </div>

            <div className='flex-1'>
              <h2
                className={`text-left text-heading3-bold text-light-1 ${
                  abilities?.includes('gold-name') && 'text-yellow-400'
                }`}
              >
                {name}
              </h2>
              <p className='text-base-medium text-gray-1'>@{username}</p>
            </div>
          </div>
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
        <div className='flex gap-8'>
          {clownCount > 0 && (
            <div className='flex flex-col items-center justify-center'>
              <p className='text-center text-base-medium text-gray-1'>Clowns</p>
              <p className='text-center text-base-semibold text-light-1'>
                {clownCount}
              </p>
            </div>
          )}

          <div className='flex flex-col items-center justify-center'>
            <p className='text-center text-base-medium text-gray-1'>
              Followers
            </p>
            <p className='text-center text-base-semibold text-light-1'>
              {subscribers.length}
            </p>
          </div>
          {accountId !== authUserId && (
            <FollowButton
              accountId={accountId}
              authUserId={authUserId}
              subscribers={subscribers}
            />
          )}
        </div>
      </div>

      <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  )
}

export default ProfileHeader
