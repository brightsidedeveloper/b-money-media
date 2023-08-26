'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import Image from 'next/image'
import { postValidation } from '@/lib/validations/post'
import { addComment } from '@/lib/actions/post.actions'

interface CommentProps {
  threadId: string
  currentUserImage: string
  currentUserId: string
}

export default function Comment({
  threadId,
  currentUserImage,
  currentUserId,
}: CommentProps) {
  const router = useRouter()
  const path = usePathname()

  const form = useForm({
    resolver: zodResolver(postValidation),
    defaultValues: {
      thread: '',
      accountId: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof postValidation>) => {
    await addComment({
      threadId,
      commentText: values.thread,
      userId: JSON.parse(currentUserId),
      path,
    })

    form.reset()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex items-center gap-3 w-full'>
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt='Profile Image'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  )
}
