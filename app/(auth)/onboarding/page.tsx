import { currentUser } from '@clerk/nextjs'
import AccountProfile from '@/components/forms/AccountProfile'

export default async function OnboardingPage() {
  const user = await currentUser()

  const userInfo = {}

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl || '',
  }
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now to use B$ Media
      </p>

      <section className='mt-9 bg-dark-2 p-10 rounded-lg'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  )
}
