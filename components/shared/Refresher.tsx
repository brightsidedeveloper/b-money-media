'use client'

import { useEffect } from "react"


export default function Refresher({customStyles}: {customStyles?: string}) {
useEffect(() => {
    const i = setInterval(() => {
            window.location.reload()
        }, 1000 * 60)
        return () => clearInterval(i)
}, [])    
  return (
    <button onClick={() => window.location.reload()} className={`bg-primary-500 hover:bg-[#d5485d] rounded-full px-3 py-0.5 text-small-regular text-white ${customStyles ? customStyles : ''}`}>Refresh</button>
  )
}
