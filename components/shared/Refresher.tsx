'use client'

import { useEffect } from "react"


export default function Refresher() {
useEffect(() => {
    const i = setInterval(() => {
            window.location.reload()
        }, 1000 * 60)
        return () => clearInterval(i)
}, [])    
  return (
    <button onClick={() => window.location.reload()} className='bg-primary-500 rounded-full px-3 py-0.5 text-small-regular text-white'>Refresh</button>
  )
}
