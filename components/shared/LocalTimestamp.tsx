'use client'

import { formatDateString } from '@/lib/utils'
import React from 'react'

export default function LocalTimestamp({ createdAt }: any) {
  return (
    <span className='text-light-1/50 text-small-regular'>
      {formatDateString(createdAt)}
    </span>
  )
}
