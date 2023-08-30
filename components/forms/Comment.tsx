'use client'

import { z } from 'zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { CommentValidation } from '@/lib/validations/thread'
import { addCommentToThread } from '@/lib/actions/thread.actions'
import { useState } from 'react'

interface Props {
  threadId: string
  currentUserImg: string
  crowned?: boolean
  currentUserId: string
}

function Comment({ threadId, currentUserImg, crowned, currentUserId }: Props) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setLoading(true)
    try {
      await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
      )
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <div className='relative'>
                  {crowned && (
                    <Image
                      src='/assets/crown.png'
                      alt='crown'
                      width={24}
                      height={24}
                      className='rotate-[20deg] absolute -top-3 right-0 z-10'
                    />
                  )}
                  <Image
                    src={currentUserImg}
                    alt='current_user'
                    width={48}
                    height={48}
                    className='rounded-full cover object-cover'
                  />
                </div>
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={loading} type='submit' className='comment-form_btn'>
          {loading ? 'Sending...' : 'Reply'}
        </Button>
      </form>
    </Form>
  )
}

export default Comment
