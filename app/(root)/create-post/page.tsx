import CreatePost from '@/components/forms/CreatePost'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser()

  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <>
      <h1 className='head-text'>Create Post</h1>
      <CreatePost />
    </>
  )
}
