import MediaRoom from "@/components/MediaRoom"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import BackButton from "./BackButton"

export default async function page() {
  const user = await currentUser()
  if (!user) redirect("/landing")

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")

  return (
    <div className="fixed bg-[#111111] inset-0 z-50">
      <BackButton />
      <MediaRoom user={userInfo} video audio />
    </div>
  )
}
