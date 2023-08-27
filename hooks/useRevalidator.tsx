import { revalidate } from '@/lib/actions/reavlidations.actions'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function useRevalidator(path: string) {
    const router = useRouter()
    useEffect(() => {
        setInterval(async () => {
          revalidate(path)
          router.refresh()
        }, 1000 * 60)
      }, [])
}
