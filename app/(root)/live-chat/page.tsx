import MediaRoom from '@/components/MediaRoom'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await currentUser()
  if (!user) redirect('/landing')

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <div className='-ml-6 -mr-6'>
      <MediaRoom user={userInfo} video audio />
    </div>
  )
}
