import Image from 'next/image'
import Link from 'next/link'

import { cn, formatDateString } from '@/lib/utils'
import DeleteThread from '../forms/DeleteThread'
import LikePost from '../forms/LikePost'
import { create } from 'domain'

interface Props {
  id: string
  uid: string
  currentUserId: string
  parentId: string | null
  content: string
  author: {
    name: string
    username: string
    image: string
    verified: boolean
    id: string
    abilities: string[]
  }

  createdAt: string
  comments: {
    author: {
      image: string
      abilities: string[]
    }
  }[]
  isComment?: boolean
  liked: boolean
  likes: number
}

function ThreadCard({
  id,
  uid,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
  likes,
  liked,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              {author.abilities?.includes('party-hat') ? (
                <Image
                  src='/assets/party-hat.png'
                  alt='crown'
                  width={24}
                  height={24}
                  className='rotate-[20deg] absolute -top-5 right-0 z-10'
                />
              ) : (
                author.abilities?.includes('crown') && (
                  <Image
                    src='/assets/crown.png'
                    alt='crown'
                    width={author.abilities?.includes('mega-crown') ? 44 : 24}
                    height={author.abilities?.includes('mega-crown') ? 44 : 24}
                    className={cn(
                      'rotate-[20deg] absolute -top-3 right-0 z-10',
                      author.abilities?.includes('mega-crown') &&
                        '-top-6 -right-2'
                    )}
                  />
                )
              )}
              <Image
                src={
                  author.abilities?.includes('clown')
                    ? '/assets/clown.png'
                    : author.image
                }
                alt='user_image'
                fill
                className='cursor-pointer object-cover rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <div className='flex flex-col'>
                <h4
                  className={cn(
                    'cursor-pointer text-base-semibold text-light-1',
                    author.abilities?.includes('gold-name') && 'text-yellow-400'
                  )}
                >
                  {author.name}
                </h4>
                <p className='cursor-pointer text-small-regular text-light-1/50'>
                  @{author.username}
                </p>
              </div>
            </Link>

            <p
              className={`mt-2 text-small-regular text-light-2 ${
                author.abilities?.includes('rainbow-text')
                  ? 'rainbow-text'
                  : author.abilities?.includes('gold-text') && 'text-yellow-400'
              }`}
            >
              {content}
            </p>

            <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                <LikePost
                  threadId={JSON.stringify(id)}
                  userId={JSON.stringify(uid)}
                  liked={liked}
                  count={likes}
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                  <p className='text-subtle-semibold text-center mx-auto text-gray-1'>
                    {comments?.length || 0}
                  </p>
                </Link>
                {/* <Image
                  src='/assets/repost.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                /> */}
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <Link href={`/thread/${id}`}>
          <div className='ml-1 mt-3 flex items-center gap-2'>
            {comments.slice(0, 4).map((comment, index) => (
              <div
                className={cn(index !== 0 && '-ml-7', 'relative h-8 w-8')}
                key={index}
              >
                <Image
                  key={index}
                  src={
                    comment.author.abilities?.includes('clown')
                      ? '/assets/clown.png'
                      : comment.author.image
                  }
                  alt={`user_${index}`}
                  fill
                  className='rounded-full object-cover'
                />
              </div>
            ))}

            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
            </p>
          </div>
        </Link>
      )}
    </article>
  )
}

export default ThreadCard
