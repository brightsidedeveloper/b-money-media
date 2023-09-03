'use client'

import { useEffect } from 'react'

export default function Refresher({
  noAuto,
}: {
  customStyles?: string
  noAuto?: boolean
}) {
  useEffect(() => {
    if (noAuto) return
    const i = setInterval(() => {
      window.location.reload()
    }, 1000 * 60)
    return () => clearInterval(i)
  }, [])

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

      const scroller = document.querySelector(':root')

      if (
        Math.abs(touchEndX - touchStartX) < 50 ||
        Math.abs(touchEndY - touchStartY) > 150 ||
        touchEndY > touchStartY ||
        (scroller && scroller.scrollTop <= 0)
      )
        window.location.reload()
    }

    document.addEventListener('touchstart', touchStart)
    document.addEventListener('touchend', touchEnd)

    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchend', touchEnd)
    }
  }, [])

  return null
}
