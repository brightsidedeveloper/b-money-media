import * as z from 'zod'

export const userValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(3, 'Minimum of 3 characters').max(30),
  username: z.string().min(3, 'Minimum of 3 characters').max(30),
  bio: z.string().max(100, 'Maximum of 1000 characters'),
})
