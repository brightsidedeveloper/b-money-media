import ThreadCard from '@/components/cards/ThreadCard'
import { fetchPosts } from '@/lib/actions/post.actions'
import { currentUser } from '@clerk/nextjs'

export default async function Home() {
  const user = await currentUser()
  const result = await fetchPosts()
  if (!result) return null

  console.log(result.posts)

  return (
    <>
      <h1 className='head-text'>Home</h1>
      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No posts found.</p>
        ) : (
          result.posts.map((post: any) => (
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={user?.id || ''}
              content={post.text}
              comments={post.children}
              author={post.author}
              parentId={post.parentId}
              createdAt={post.createdAt}
            ></ThreadCard>
          ))
        )}
      </section>
    </>
  )
}
