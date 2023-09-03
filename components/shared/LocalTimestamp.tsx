'use client'

import { formatDateString } from '@/lib/utils'
import React from 'react'

export default function LocalTimestamp({ createdAt }: any) {
  return <span className='text-light-2/40'>{formatDateString(createdAt)}</span>
}
