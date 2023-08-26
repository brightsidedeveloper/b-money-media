'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { connectToDatabase } from '../mongoose'
import { currentUser } from '@clerk/nextjs'

interface Params {
  username: string
  name: string
  bio: string
  image: string
  path: string
}

export async function updateUser({
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  try {
    connectToDatabase()

    const clerkUser = await currentUser()

    if (!clerkUser) throw new Error('No user authenticated')

    await User.findOneAndUpdate(
      { id: clerkUser.id },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    )

    if (path === '/profile/edit') revalidatePath(path)
  } catch (error: any) {
    console.error('Failed to update user', error.message)
  }
}

export async function fetchUser() {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) throw new Error('No user authenticated')

    await connectToDatabase()

    const mongooseUser = await User.findOne({ id: clerkUser.id })
    // .populate({
    //   path: 'Communities',
    //   model: Community,
    // })

    if (!mongooseUser) throw new Error('No user found')

    return mongooseUser
  } catch (error: any) {
    console.error(error.message)
  }
}
