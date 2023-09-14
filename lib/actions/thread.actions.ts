'use server'

import { revalidatePath } from 'next/cache'

import { connectToDB } from '../mongoose'

import User from '../models/user.model'
import Thread from '../models/thread.model'
import { sendNotification } from '../sendNotification'

// import { Knock } from '@knocklabs/node'

// const knock = new Knock(process.env.KNOCK_SECRET_KEY)

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB()

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'author',
      model: User,
    })

    .populate({
      path: 'children', // Populate the children field
      populate: {
        path: 'author', // Populate the author field within children
        model: User,
        select: '_id name username abilities verified parentId image', // Select only _id and username fields of the author
      },
    })

  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }) // Get the total count of posts

  const posts = await postsQuery.exec()

  const isNext = totalPostsCount > skipAmount + posts.length

  return { posts, isNext }
}

interface Params {
  text: string
  author: string
  path: string
}

export async function createThread({ text, author, path }: Params) {
  try {
    connectToDB()

    const ats = text.match(/@\w+/g) || []

    const userAts = await Promise.all(
      ats.map(async (at: string) => {
        const user = await User.findOne({ username: at.slice(1) }).select(
          '_id id username'
        )
        if (!user) return ''
        return JSON.stringify(user)
      })
    )

    const createdThread = await Thread.create({
      text,
      author,
      ats: userAts.filter(data => data !== ''),
    })

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    })

    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`)
  }
}

async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId })

  const descendantThreads = []
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id)
    descendantThreads.push(childThread, ...descendants)
  }

  return descendantThreads
}

export async function deleteThread(id: string, path: string): Promise<void> {
  try {
    connectToDB()

    // Find the thread to be deleted (the main thread)
    const mainThread = await Thread.findById(id).populate('author')

    if (!mainThread) {
      throw new Error('Thread not found')
    }

    // Fetch all child threads and their descendants recursively
    const descendantThreads = await fetchAllChildThreads(id)

    // Get all descendant thread IDs including the main thread ID and child thread IDs
    const descendantThreadIds = [
      id,
      ...descendantThreads.map(thread => thread._id),
    ]

    // Extract the authorIds to update User model
    const uniqueAuthorIds = new Set(
      [
        ...descendantThreads.map(thread => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.author?._id?.toString(),
      ].filter(id => id !== undefined)
    )

    // Recursively delete child threads and their descendants
    await Thread.deleteMany({ _id: { $in: descendantThreadIds } })

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    )

    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`)
  }
}

export async function fetchThreadById(threadId: string) {
  connectToDB()

  try {
    const thread = await Thread.findById(threadId)
      .populate({
        path: 'author',
        model: User,
        select: '_id id username abilities verified name image',
      }) // Populate the author field with _id and username

      .populate({
        path: 'children', // Populate the children field
        populate: [
          {
            path: 'author', // Populate the author field within children
            model: User,
            select: '_id id name username abilities verified parentId image', // Select only _id and username fields of the author
          },
          {
            path: 'children', // Populate the children field within children
            model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: 'author', // Populate the author field within nested children
              model: User,
              select: '_id id name username abilities verified parentId image', // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec()

    return thread
  } catch (err) {
    console.error('Error while fetching thread:', err)
    throw new Error('Unable to fetch thread')
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB()

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId).populate({
      path: 'author',
      model: User,
    })

    if (!originalThread) {
      throw new Error('Thread not found')
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    })

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save()

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id)

    // Save the updated original thread to the database
    await originalThread.save()

    const sender = await User.findById(userId)
    if (originalThread.author.subscription && originalThread.author.id !== sender.id) {
      await sendNotification(originalThread.author.subscription, {
        title: `${sender.name} replied to your thread`,
        options: {
          body: commentText,
          tag: originalThread._id,
          data: {
            url: `/${originalThread._id}`,
          },
        },
      })
    }

    revalidatePath(path)
  } catch (err) {
    console.error('Error while adding comment:', err)
    throw new Error('Unable to add comment')
  }
}

export async function likePost(
  threadId: string,
  userId: string,
  path: string,
  clown?: boolean
) {
  connectToDB()

  try {
    // Find the original thread by its ID
    const it = clown ? { clowns: userId } : { likes: userId }
    const originalThread = await Thread.findByIdAndUpdate(
      threadId,
      {
        $push: it,
      },
      { upsert: true }
    ).populate({
      path: 'author',
      model: User,
    })



    if (clown) {
      // Find @ed users
      const userLiked = await User.findOne({ id: userId })

      await Promise.all(
        originalThread.ats?.forEach(async (at: string) => {
          const user = JSON.parse(at)
          if (!user) return
          const dbUser = await User.findOneAndUpdate(
            { id: user.id },
            { $push: { clownCount: 1 } },
            { upsert: true }
          )
          if (dbUser.subscription && originalThread.author?.id !== userLiked.id) {
            await sendNotification(dbUser.subscription, {
              title: `${userLiked.name} clown you`,
              options: {
                body: `Clowned on ${originalThread.author?.name}'s post`,
                tag: originalThread._id,
                data: {
                  url: `/${originalThread._id}`,
                },
              },
            })
          } 
        }) || []
      )
    } else {
    const userLiked = await User.findById(userId)

      if (userLiked.subscription && originalThread.author?.id !== userLiked.id) {
        await sendNotification(originalThread.author?.subscription, {
          title: `${userLiked.name} liked your post`,
          options: {
            body: originalThread.text,
            tag: originalThread._id,
            data: {
              url: `/${originalThread._id}`,
            },
          },
        })
      }
    }

    revalidatePath(path)
  } catch (err) {
    console.error('Error while liking post:', err)
    throw new Error('Unable to like post')
  }
}
