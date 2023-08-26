import Image from 'next/image'
import Link from 'next/link'

interface ThreadCardProps {
  id: string
  currentUserId: string
  parentId: string
  author: {
    id: string
    username: string
    name: string
    image: string
  }
  content: string
  community: {
    id: string
    name: string
    image: string
  } | null
  comments: {
    author: {
      image: string
      name: string
      username: string
    }
  }[]
  isComment?: boolean
  createdAt: string
}

export default function ThreadCard({
  id,
  currentUserId,
  content,
  comments,
  author,
  isComment,
}: any) {
  return (
    <article className='flex w-full flex-col rounded-xl bg-dark-2 p-7'>
      <div className='flex justify-between items-start'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link
              href={`/user/${currentUserId}`}
              className='relative h-11 w-11'
            >
              <Image
                src={author?.image}
                alt='Profile Image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>
          <div>
            <Link
              href={`/user/${currentUserId}`}
              className='w-fit flex flex-col  cursor-pointer'
            >
              <h4 className=' text-base-semibold text-light-1'>
                {author.name}
              </h4>
              <h6 className='text-white/30 text-[14px]'>@{author.username}</h6>
            </Link>
            <p className='text-light-2 text-small-regular mt-4'>{content}</p>
            <div className='flex flex-col gap-3 mt-5'>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  width={24}
                  height={24}
                  alt='Heart Icon'
                  className='cursor-pointer object-contain'
                />
                <Link href={`/post/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    width={24}
                    height={24}
                    alt='Reply Icon'
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  width={24}
                  height={24}
                  alt='Repost Icon'
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  width={24}
                  height={24}
                  alt='Share Icon'
                  className='cursor-pointer object-contain'
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/post/${id}`}>
                  <p className='mt-1 text-gray-1 text-subtle-medium'>
                    View {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
