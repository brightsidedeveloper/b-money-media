import MediaRoom from "@/components/MediaRoom"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import BackButton from "./BackButton"
import User from "@/lib/models/user.model"
import { sendNotification } from "@/lib/sendNotification"

export default async function page() {
  const user = await currentUser()
  if (!user) redirect("/landing")

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")

  const notifyLiveStarted = async (username: string) => {
    "use server"
    const users = await User.find({ subscription: { $exists: true, $ne: "" } })
    users.forEach((user: any) => {
      sendNotification(user.subscription, {
        title: `@${username} started a live video`,
        options: {
          body: "Click here to join",
          data: {
            url: `/live-chat`,
          },
        },
      })
    })
  }
  await notifyLiveStarted(userInfo.username)

  return (
    <div className="fixed bg-[#111111] inset-0 z-50">
      <BackButton />
      <MediaRoom user={userInfo} video audio />
    </div>
  )
}
