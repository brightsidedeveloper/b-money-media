'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { followUser } from '@/lib/actions/user.actions'

interface Props {
  accountId: string
  authUserId: string
  subscribers: string[]
}

export default function FollowButton({
  accountId,
  authUserId,
  subscribers,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(
    subscribers.includes(authUserId)
  )
  const [loading, setLoading] = useState(false)

  const toggleFollow = async () => {
    setLoading(true)
    setIsFollowing(!isFollowing)
    const { error, username } = await followUser(accountId, authUserId)
    if (error) {
      setIsFollowing(subscribers.includes(authUserId))
      toast.error(error)
    } else {
      toast.success(
        `You ${isFollowing ? 'unfollowed' : 'followed'} @${username}`
      )
    }
    setLoading(false)
  }

  return (
    <Button disabled={loading} className='user-card_btn' onClick={toggleFollow}>
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  )
}
