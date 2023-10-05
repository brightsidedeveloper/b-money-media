import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
  return (
    <>
      <h1 className='head-text text-left'>Home</h1>
      <section className=' mt-9 flex flex-col gap-10'>
        <Skeleton className='w-full h-[200px] bg-dark-2' />
        <Skeleton className='w-full h-[200px] bg-dark-2' />
        <Skeleton className='w-full h-[200px] bg-dark-2' />
        <Skeleton className='w-full h-[200px] bg-dark-2' />
        <Skeleton className='w-full h-[200px] bg-dark-2' />
        <Skeleton className='w-full h-[200px] bg-dark-2' />
      </section>
    </>
  )
}
