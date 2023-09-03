'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useOrganization } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { ThreadValidation } from '@/lib/validations/thread'
import { createThread } from '@/lib/actions/thread.actions'
import { useState } from 'react'

interface Props {
  userId: string
}

function PostThread({ userId }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const { organization } = useOrganization()

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  })

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setLoading(true)
    try {
      await createThread({
        text: values.thread,
        author: userId,
        path: pathname,
      })
    } catch (error) {
      console.log(error)
    } finally {
      router.push('/')
      setTimeout(() => setLoading(false), 500)
    }
  }

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type='submit' className='bg-primary-500'>
          {loading ? 'Posting...' : 'Post Thread'}
        </Button>
      </form>
    </Form>
  )
}

export default PostThread
