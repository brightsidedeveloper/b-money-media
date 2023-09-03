import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'

import Comment from '@/components/forms/Comment'
import ThreadCard from '@/components/cards/ThreadCard'

import { fetchUser } from '@/lib/actions/user.actions'
import { fetchThreadById } from '@/lib/actions/thread.actions'
import Refresher from '@/components/shared/Refresher'

export const revalidate = 0

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null

  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const thread = await fetchThreadById(params.id)

  return (
    <section className='relative'>
      <Refresher customStyles='w-full py-4 mb-3 -mt-20 rounded-xl' noAuto />
      <div>
        <ThreadCard
          id={thread._id}
          uid={userInfo._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          createdAt={thread.createdAt}
          comments={thread.children}
          liked={thread?.likes?.includes(userInfo._id)}
          likes={thread.likes.length}
        />
      </div>

      <div className='mt-7'>
        <Comment
          threadId={params.id}
          currentUserImg={userInfo.image}
          abilities={userInfo.abilities || []}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className='mt-10'>
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            uid={userInfo._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            liked={childItem?.likes?.includes(userInfo._id)}
            likes={childItem.likes?.length}
            isComment
          />
        ))}
      </div>
    </section>
  )
}

export default page
