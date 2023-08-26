import ThreadCard from '@/components/cards/ThreadCard'
import Comment from '@/components/forms/Comment'
import { fetchPostById } from '@/lib/actions/post.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/login')
  const userInfo = await fetchUser()
  if (!userInfo?.onboarded) redirect('/onboarding')

  const post = await fetchPostById(params.id)

  return (
    <section className='relative'>
      <div>
        <ThreadCard
          key={post._id}
          id={post._id}
          currentUserId={clerkUser?.id || ''}
          content={post.text}
          comments={post.children}
          author={post.author}
          parentId={post.parentId}
          createdAt={post.createdAt}
        />
      </div>

      <div className='mt-7'>
        <Comment
          threadId={params.id}
          currentUserImage={clerkUser.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className='mt-10'>
        {post.children.map((comment: any) => {
          return (
            <ThreadCard
              key={comment._id}
              id={comment._id}
              currentUserId={comment?.id || ''}
              content={comment.text}
              comments={comment.children}
              author={comment.author}
              parentId={comment.parentId}
              createdAt={comment.createdAt}
              isComment
            />
          )
        })}
      </div>
    </section>
  )
}
