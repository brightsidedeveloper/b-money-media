'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Refresher({
  noAuto,
}: {
  customStyles?: string
  noAuto?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (noAuto) return
    const i = setInterval(() => {
      router.refresh()
    }, 1000 * 30)
    return () => clearInterval(i)
  }, [router, noAuto])

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
        switch (pathname) {
          case '/':
            return router.push('/search')
          case '/search':
            return router.push('/activity')
          case '/activity':
            return router.push('/wip')
          case '/wip':
            return router.push('/profile')
          default:
            return
        }
      }

      // Swipe Right
      if (touchEndX > touchStartX) {
        switch (pathname) {
          case '/profile':
            return router.push('/wip')
          case '/wip':
            return router.push('/activity')
          case '/activity':
            return router.push('/search')
          case '/search':
            return router.push('/')
          default:
            return
        }
      }
    }

    document.addEventListener('touchstart', touchStart)
    document.addEventListener('touchend', touchEnd)

    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchend', touchEnd)
    }
  }, [pathname, router])

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
        Math.abs(touchEndX - touchStartX) < 50 &&
        Math.abs(touchEndY - touchStartY) > 118 &&
        touchEndY > touchStartY &&
        scroller &&
        scroller.scrollTop <= 0
      ) {
        setRefreshing(true)
        router.refresh()
        setTimeout(() => {
          setRefreshing(false)
        }, 500)
      }
    }

    document.addEventListener('touchstart', touchStart)
    document.addEventListener('touchend', touchEnd)

    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchend', touchEnd)
    }
  }, [router])

  if (refreshing)
    return (
      <div className='fixed top-12 left-1/2 -translate-x-1/2 scale-[40%]'>
        <div className='lds-spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
}
