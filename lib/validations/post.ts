import * as z from 'zod'

export const postValidation = z.object({
  thread: z.string().nonempty().min(3, 'Minimum of 3 characters').max(1000),
  accountId: z.string(),
})
