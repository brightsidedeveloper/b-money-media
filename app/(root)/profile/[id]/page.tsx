import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import ProfileHeader from '@/components/shared/ProfileHeader'

import { fetchUser, fetchUserPosts } from '@/lib/actions/user.actions'
import ThreadCard from '@/components/cards/ThreadCard'

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()
  if (!user) return null
  const authUser = await fetchUser(user.id)
  const isAdmin = !!authUser?.admin

  const userInfo = await fetchUser(params.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const result: any = (await fetchUserPosts(userInfo.id)) || []

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        abilities={userInfo.abilities || []}
        bio={userInfo.bio}
        isAdmin={isAdmin}
        crowned={userInfo.verified}
        path={`/profile/${params.id}`}
        clownCount={userInfo.clownCount?.length || 0}
      />

      <section className='mt-9 flex flex-col gap-10'>
        {result.threads.map((thread: any) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            uid={userInfo._id}
            currentUserId={user.id}
            parentId={thread.parentId}
            content={thread.text}
            ats={thread.ats}
            author={{
              name: result.name,
              image: result.image,
              id: result.id,
              username: result.username,
              verified: result.verified,
              abilities: result.abilities || [],
            }}
            createdAt={thread.createdAt}
            comments={thread.children}
            liked={thread.likes?.includes(userInfo._id)}
            likes={thread.likes?.length || 0}
            clowned={thread.clowns?.includes(userInfo._id)}
            clowns={thread.clowns?.length || 0}
          />
        ))}
      </section>
    </section>
  )
}
export default Page
