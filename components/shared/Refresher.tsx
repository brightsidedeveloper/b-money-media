'use client'
import useRevalidator from '@/hooks/useRevalidator';

export default function Refresher({path}: {path: string}) {
    const revalidate = useRevalidator(path);

    return (
        <button className='bg-primary-500 text-small-regular text-white px-3 py-1 rounded-full'onClick={revalidate}>Refresh</button>
    )
}
