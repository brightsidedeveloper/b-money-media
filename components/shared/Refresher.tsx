'use client'

import { useEffect, useState } from 'react'

export default function Refresher({
  noAuto,
}: {
  customStyles?: string
  noAuto?: boolean
}) {
  const [refreshing, setRefreshing] = useState(false)

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
        Math.abs(touchEndX - touchStartX) < 50 &&
        Math.abs(touchEndY - touchStartY) > 150 &&
        touchEndY > touchStartY &&
        scroller &&
        scroller.scrollTop <= 0
      ) {
        setRefreshing(true)
        window.location.reload()
      }
    }

    document.addEventListener('touchstart', touchStart)
    document.addEventListener('touchend', touchEnd)

    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchend', touchEnd)
    }
  }, [])

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
