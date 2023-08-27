import { revalidate } from '@/lib/actions/reavalidations.actions'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function useRevalidator(path: string) {
    const router = useRouter()
    useEffect(() => {
        setInterval(async () => {
          await revalidate(path)
          router.refresh()
        }, 1000 * 60)
      }, [])

      const revalidator = useCallback(async () => {
        await revalidate(path)
        router.refresh()
      }, [])

        return revalidator
}
