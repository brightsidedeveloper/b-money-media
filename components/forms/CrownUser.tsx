'use client'

import { crownUser } from '@/lib/actions/admin.actions'

export default function CrownUser({
  username,
  crowned,
  path,
}: {
  username: string
  crowned?: boolean
  path?: string
}) {
  const crown = async () => await crownUser(username, !crowned, path || '/')

  return (
    <button
      onClick={crown}
      className='flex text-light-1 cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'
    >
      Crown
    </button>
  )
}
