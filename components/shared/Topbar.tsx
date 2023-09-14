import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser, SignedIn, SignOutButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import EnableNotifications from "../forms/EnableNotifications"

async function Topbar() {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.admin) return null

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/x2-logo.png" alt="logo" width={40} height={40} />
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <p className="text-light-1">Admin</p>
              </Link>
              <div className="flex gap-6 item-center">
                <EnableNotifications />
                <SignOutButton>
                  <div className="flex cursor-pointer">
                    <Image
                      src="/assets/logout.svg"
                      alt="logout"
                      width={24}
                      height={24}
                    />
                  </div>
                </SignOutButton>
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Topbar
