'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

interface Props {
  id: string
  name: string
  username: string
  crowned?: boolean
  imgUrl: string
  personType: string
}

function UserCard({ id, name, username, crowned, imgUrl, personType }: Props) {
  const router = useRouter()

  const isCommunity = personType === 'Community'

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          {crowned && (
            <Image
              src='/assets/crown.png'
              alt='crown'
              width={24}
              height={24}
              className='rotate-[20deg] absolute -top-3 right-0 z-10'
            />
          )}
          <Image
            src={imgUrl}
            alt='user_logo'
            fill
            className='rounded-full object-cover'
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1'>{name}</h4>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <Button
        className='user-card_btn'
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}`)
          } else {
            router.push(`/profile/${id}`)
          }
        }}
      >
        View
      </Button>
    </article>
  )
}

export default UserCard
