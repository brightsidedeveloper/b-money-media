"use client"

import useHydrated from "@/hooks/useHydrated"
import { urlB64ToUint8Array } from "@/lib/utils"
import { Bell, BellMinus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function EnableNotifications() {
  const [status, setStatus] = useState(
    typeof Notification === "undefined" ? null : Notification.permission
  )

  useEffect(() => {
    ;(async () => {
      await navigator.serviceWorker.register("/x2-sw.js")
    })()
  }, [])

  const onSubscribe = async () => {
    const perm = await Notification.requestPermission()
    setStatus(perm)
    if (perm === "granted") {
      await navigator.serviceWorker.ready
      const reg = await navigator.serviceWorker.getRegistration()
      if (!reg) return alert("No Service Worker found")

      const options = {
        applicationServerKey: urlB64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
        ),
        userVisibleOnly: true,
      }

      const subscription = await reg.pushManager.subscribe(options)
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      })
      const { error, user } = await res.json()
      console.log(user)
      if (error) return toast.error(error)
      reg.showNotification("Successfully Subscribed", {
        body: "You will now recieve notifications!",
      })
    }
  }

  if (useHydrated())
    return (
      <>
        {!status ? (
          <p className="text-white">Please Add App to Homescreen</p>
        ) : status === "denied" ? (
          <BellMinus className="w-4 h-4 text-white" />
        ) : status === "granted" ? null : (
          <button className="w-fit" onClick={onSubscribe}>
            <Bell className="w-4 h-4 text-white" />
          </button>
        )}
      </>
    )
}
