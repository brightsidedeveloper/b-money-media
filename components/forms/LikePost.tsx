"use client"
import { likePost } from "@/lib/actions/thread.actions"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface LikePostProps {
  threadId: string
  userId: string
  liked: boolean
  count: number
  clown?: boolean
}

export default function LikePost({
  threadId,
  userId,
  liked,
  count,
  clown,
}: LikePostProps) {
  const path = usePathname()
  const [optimisicLike, setOptimisticLike] = useState(false)

  useEffect(() => {
    setOptimisticLike(false)
  }, [count, liked])

  const like = async () => {
    setOptimisticLike(true)
    await likePost(JSON.parse(threadId), JSON.parse(userId), path, clown)
  }

  return (
    <button
      className="flex flex-col justify-center items-center "
      disabled={liked || optimisicLike}
      onClick={like}
    >
      {clown ? (
        <span
          className={cn(
            "w-6 h-6",
            !liked && !optimisicLike && "grayscale opacity-50"
          )}
        >
          🤡
        </span>
      ) : (
        <Image
          src={
            liked || optimisicLike
              ? "/assets/heart-filled.svg"
              : "/assets/heart-gray.svg"
          }
          alt="heart"
          width={24}
          height={24}
          className="object-contain"
        />
      )}
      <p className="text-subtle-semibold text-center mx-auto text-gray-1">
        {optimisicLike ? count + 1 : count}
      </p>
    </button>
  )
}
