"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Props {
  id: string
  name: string
  username: string
  abilities?: string[]
  imgUrl: string
  personType: string
}

function UserCard({
  id,
  name,
  username,
  abilities,
  imgUrl,
  personType,
}: Props) {
  const router = useRouter()

  return (
    <Link href={`/profile/${id}`}>
      <article className="user-card">
        <div className="user-card_avatar">
          <div className="relative h-12 w-12">
            {abilities?.includes("party-hat") ? (
              <Image
                src="/assets/party-hat.png"
                alt="crown"
                width={24}
                height={24}
                className="rotate-[20deg] absolute -top-5 right-0 z-10"
              />
            ) : (
              abilities?.includes("crown") && (
                <Image
                  src="/assets/crown.png"
                  alt="crown"
                  width={abilities?.includes("mega-crown") ? 44 : 24}
                  height={abilities?.includes("mega-crown") ? 44 : 24}
                  className={cn(
                    "rotate-[20deg] absolute -top-3 right-0 z-10",
                    abilities?.includes("mega-crown") && "-top-6 -right-2"
                  )}
                />
              )
            )}
            <Image
              src={imgUrl}
              alt="user_logo"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1 text-ellipsis">
            <h4
              className={cn(
                "text-base-semibold text-light-1",
                abilities?.includes("gold-name") && "text-yellow-400"
              )}
            >
              {name}
            </h4>
            <p className="text-small-medium text-gray-1">@{username}</p>
          </div>
        </div>

        <Button className="user-card_btn" onClick={() => {}}>
          View
        </Button>
      </article>
    </Link>
  )
}

export default UserCard
