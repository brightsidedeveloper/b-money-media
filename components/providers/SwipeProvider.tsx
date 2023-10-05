"use client"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function SwipeProvider() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0
    let touchStartY = 0
    let touchEndY = 0
    const touchStart = (e: any) => {
      touchStartX = e.changedTouches[0].screenX
      touchStartY = e.changedTouches[0].screenY
    }
    const touchEnd = (e: any) => {
      touchEndX = e.changedTouches[0].screenX
      touchEndY = e.changedTouches[0].screenY

      if (
        Math.abs(touchEndX - touchStartX) < 100 ||
        Math.abs(touchEndY - touchStartY) > 50
      )
        return

      // Swipe Left
      if (touchEndX < touchStartX) {
        //TODO Fix this :)
      }

      // Swipe Right
      else if (touchEndX > touchStartX) {
        router.back()
      }
    }

    document.addEventListener("touchstart", touchStart)
    document.addEventListener("touchend", touchEnd)

    return () => {
      document.removeEventListener("touchstart", touchStart)
      document.removeEventListener("touchend", touchEnd)
    }
  }, [pathname, router])
  return null
}
