import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import ThreadCard from '@/components/cards/ThreadCard'
import Pagination from '@/components/shared/Pagination'

import { fetchPosts } from '@/lib/actions/thread.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import Refresher from '@/components/shared/Refresher'

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const user = await currentUser()
  if (!user) redirect('/landing')

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  )

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='head-text text-left'>Home</h1>
        <Refresher />
      </div>

      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.posts.map(post => {
              return (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  uid={userInfo._id}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                  liked={post.likes?.includes(userInfo._id)}
                  likes={post.likes?.length}
                />
              )
            })}
          </>
        )}
      </section>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  )
}

export default Home
