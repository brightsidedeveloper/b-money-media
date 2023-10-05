import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
  return (
    <>
      <h1 className='head-text'>Create Thread</h1>

      <Skeleton className='mt-16 w-full h-[500px] border-dark-4 bg-dark-3' />
    </>
  )
}
