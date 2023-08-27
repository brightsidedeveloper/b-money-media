'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RouterRefresher() {
    const router = useRouter()

    useEffect(() => {
        const i = setInterval(() => {
            router.refresh()
        }, 120_000)
        return () => clearInterval(i)
    }, [])
  return null
}
