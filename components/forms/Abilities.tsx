'use client'

import { promoteAbility } from '@/lib/actions/admin.actions'
import { useState } from 'react'

export default function Abilities({
  username,
  path,
}: {
  username: string
  path?: string
}) {
  const [selectValue, setSelectValue] = useState<string>('gold-text')

  return (
    <div className='flex gap-1 p-1'>
      <select
        value={selectValue}
        onChange={e => setSelectValue(e.target.value)}
      >
        <option value='gold-name'>Gold Name</option>
        <option value='rainbow-text'>Rainbow Text</option>
        <option value='gold-text'>Gold Text</option>
        <option value='party-hat'>Party Hat</option>
        <option value='crown'>Crown</option>
      </select>
      <button
        onClick={() => promoteAbility(username, selectValue, true, path || '/')}
        className='bg-dark-3 rounded-lg flex items-center justify-center w-9 h-9 text-white'
      >
        +
      </button>
      <button
        onClick={() =>
          promoteAbility(username, selectValue, false, path || '/')
        }
        className='bg-dark-3 rounded-lg flex items-center justify-center w-9 h-9 text-white'
      >
        -
      </button>
    </div>
  )
}
