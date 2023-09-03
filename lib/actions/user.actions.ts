'use server'

import { FilterQuery, SortOrder } from 'mongoose'
import { revalidatePath } from 'next/cache'

import Thread from '../models/thread.model'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'

// import { Knock } from '@knocklabs/node'
// const knock = new Knock(process.env.KNOCK_SECRET_KEY)

export async function fetchUser(userId: string) {
  try {
    connectToDB()

    const user = await User.findOne({ id: userId })

    // await knock.users.identify(userId, {
    //   name: user.name,
    // })

    return user
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }
}

interface Params {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB()

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    )

    if (path === '/profile/edit') {
      revalidatePath(path)
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB()

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: 'threads',
      model: Thread,
      populate: [
        {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'name username verified image id', // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    })
    return threads
  } catch (error) {
    console.error('Error fetching user threads:', error)
    throw error
  }
}

// Almost similar to Thead (search + pagination)  (search + pagination)
export async function fetchUsers({
  userId,
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc',
}: {
  userId: string
  searchString?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: SortOrder
}) {
  try {
    connectToDB()

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, 'i')

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
    }

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== '') {
      query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }]
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy }

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query)

    const users = await usersQuery.exec()

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length

    return { users, isNext }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB()

    // Find all threads created by the user
    const userThreads = await Thread.find({ author: userId }).sort({
      createdAt: 'desc',
    })

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children)
    }, [])

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    })
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'author',
        model: User,
        select: 'name image _id',
      })

    return replies
  } catch (error) {
    console.error('Error fetching replies: ', error)
    throw error
  }
}
