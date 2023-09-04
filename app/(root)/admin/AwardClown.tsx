'use client'

import { Button } from '@/components/ui/button'
import { awardClown } from '@/lib/actions/admin.actions'
import { useState } from 'react'

export default function AwardClown() {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    setLoading(true)
    await awardClown()
    setLoading(false)
  }

  return (
    <Button onClick={onClick}>{loading ? 'Running...' : 'Award Clown'}</Button>
  )
}
