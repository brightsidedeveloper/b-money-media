'use client'
export default function Refresher() {
  return (
    <button onClick={() => window.location.reload()} className='bg-primary-500 rounded-full px-3 py-0.5 text-small-regular text-white'>Refresh</button>
  )
}
