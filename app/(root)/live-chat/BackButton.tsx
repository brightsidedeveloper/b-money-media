'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className='absolute w-10 h-10 z-[51] top-5 left-5'
    >
      <Image
        src='/assets/arrow-left.svg'
        alt='close'
        width={24}
        height={24}
        className='cursor-pointer'
      />
    </button>
  )
}
