import { Loader2 } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <Loader2 className='text-light-1 animate-spin w-5 h-5' />
    </div>
  )
}
