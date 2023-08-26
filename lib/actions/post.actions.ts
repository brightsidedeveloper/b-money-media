'use server'

import { currentUser } from '@clerk/nextjs'
import Post from '../models/post.model'
import { connectToDatabase } from '../mongoose'
import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { fetchUser } from './user.actions'

interface Params {
  text: string
  communityId: string | null
  path: string
}

export async function createPost({ text, communityId, path }: Params) {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) throw new Error('User not authenticated')

    await connectToDatabase()

    const userInfo = await fetchUser()

    const newPost = await Post.create({
      text,
      author: userInfo._id,
      community: null,
    })

    await User.findByIdAndUpdate(userInfo._id, {
      $push: { threads: newPost._id },
    })

    revalidatePath(path)
  } catch (error: any) {
    console.error('Failed to create post', error.message)
  }
}

interface FetchPostResponse {
  isNext: boolean
  posts: any[]
}

export async function fetchPosts(
  pageNumber = 1,
  pageSize = 20
): Promise<FetchPostResponse | void> {
  try {
    await connectToDatabase()

    const skipAmount = (pageNumber - 1) * pageSize

    const postQuery = Post.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: 'author',
        model: User,
      })
      .populate({
        path: 'childern',
        populate: {
          path: 'author',
          model: User,
          select: '_id username name parentId image',
        },
      })

    const totalPostsCount = await Post.countDocuments({
      parentId: { $in: [null, undefined] },
    })

    const posts = await postQuery.exec()

    const isNext = totalPostsCount > skipAmount + posts.length

    return { isNext, posts }
  } catch (error: any) {
    console.error('Failed to fetch posts', error.message)
  }
}

export async function fetchPostById(id: string) {
  try {
    await connectToDatabase()
    // TODO: populate communities
    const post = await Post.findById(id)
      .populate({
        path: 'author',
        model: User,
      })
      .populate({
        path: 'childern',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id username name parentId image',
          },
          {
            path: 'childern',
            model: Post,
            populate: {
              path: 'author',
              model: User,
              select: '_id username name parentId image',
            },
          },
        ],
      })
      .exec()
    console.log(post)
    return post
  } catch (error: any) {
    console.error('Failed to fetch post', error.message)
  }
}

interface AddCommentParams {
  threadId: string
  commentText: string
  userId: string
  path: string
}

export async function addComment({
  threadId,
  commentText,
  userId,
  path,
}: AddCommentParams) {
  try {
    await connectToDatabase()

    const ogThread = await Post.findById(threadId)

    if (!ogThread) throw new Error('Thread not found')

    const newComment = await Post.create({
      text: commentText,
      author: userId,
      parentId: threadId,
    })

    const savedComment = await newComment.save()

    ogThread.children.push(savedComment._id)

    await ogThread.save()

    revalidatePath(path)
  } catch (error: any) {
    console.error('Failed to add comment', error.message)
  }
}
