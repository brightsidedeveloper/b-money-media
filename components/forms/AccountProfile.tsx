'use client'

import * as z from 'zod'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidation } from '@/lib/validations/user'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'

interface AccountProfileProps {
  user: {
    id: string
    objectId: string
    username: string
    name: string
    bio: string
    image: string
  }
  btnTitle: string
}

export default function AccountProfile({
  user,
  btnTitle,
}: AccountProfileProps) {
  const [files, setFiles] = useState<File[]>([])
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: user?.image || '',
      username: user?.username || '',
      name: user?.name || '',
      bio: user?.bio || '',
    },
  })

  const { startUpload } = useUploadThing('media')

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files?.length) {
      const file = e.target.files[0]

      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async ev => {
        const imageDataUrl = ev.target?.result?.toString() || ''

        fieldChange(imageDataUrl)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    const { profile_photo } = values

    const blob = profile_photo
    const hasImageChanged = isBase64Image(blob)

    if (hasImageChanged) {
      const imgRes = await startUpload(files)
      if (imgRes && imgRes[0].url) values.profile_photo = imgRes[0].url
    }

    //TODO: Call Backend API to update user profile
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 flex flex-col justify-start gap-2'
      >
        <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex  items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                <Image
                  src={field.value ? field.value : '/assets/profile.svg'}
                  width={field.value ? 96 : 24}
                  height={field.value ? 96 : 24}
                  alt='Profile Photo'
                  priority={!!field.value}
                  className={`object-contain ${field.value && 'rounded-full'}`}
                />
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200 '>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='account-form_image-input '
                  onChange={e => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl className=''>
                <Input
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col  gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Username
              </FormLabel>
              <FormControl className=''>
                <Input
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl className=''>
                <Textarea
                  rows={10}
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>
          {btnTitle}
        </Button>
      </form>
    </Form>
  )
}
