'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'
import { postValidation } from '@/lib/validations/post'
import { createPost } from '@/lib/actions/post.actions'

export default function CreatePost() {
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
    await createPost({
      text: values.thread,
      communityId: null,
      path,
    })

    router.push('/')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-10 flex flex-col justify-start gap-10'
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
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
        <Button type='submit' className='bg-primary-500'>
          Post
        </Button>
      </form>
    </Form>
  )
}
