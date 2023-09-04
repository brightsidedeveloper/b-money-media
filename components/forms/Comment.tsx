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
import { cn } from '@/lib/utils'

interface Props {
  threadId: string
  currentUserImg: string
  abilities?: string[]
  currentUserId: string
}

function Comment({
  threadId,
  currentUserImg,
  abilities,
  currentUserId,
}: Props) {
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
      form.reset()
      setLoading(false)
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
                  {abilities?.includes('party-hat') ? (
                    <Image
                      src='/assets/party-hat.png'
                      alt='crown'
                      width={24}
                      height={24}
                      className='rotate-[20deg] absolute -top-5 right-0 z-10'
                    />
                  ) : (
                    abilities?.includes('crown') && (
                      <Image
                        src='/assets/crown.png'
                        alt='crown'
                        width={abilities?.includes('mega-crown') ? 40 : 24}
                        height={abilities?.includes('mega-crown') ? 40 : 24}
                        className={cn(
                          'rotate-[20deg] absolute -top-3 right-0 z-10',
                          abilities?.includes('mega-crown') &&
                            '-top-6 -right-2.5'
                        )}
                      />
                    )
                  )}
                  <div className='relative h-11 w-11'>
                    <Image
                      src={currentUserImg}
                      alt='current_user'
                      fill
                      className='rounded-full object-cover'
                    />
                  </div>
                </div>
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  autoComplete='off'
                  autoCapitalize='off'
                  autoCorrect='off'
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
