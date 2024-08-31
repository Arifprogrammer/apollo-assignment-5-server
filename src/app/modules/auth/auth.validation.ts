import { z } from 'zod'

export const userCreateValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .trim(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email format.' })
    .trim()
    .transform(email => email.toLowerCase()),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(4, { message: 'Password must be at least 4 characters long.' }),
  phone: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a string',
    })
    .trim()
    .optional(),
  address: z
    .string({
      invalid_type_error: 'Address must be a string',
    })
    .trim()
    .optional(),
  // role: z.enum(['user', 'admin'], { message: 'Role does not match' }),
})

export const userLoginValidationSchema = userCreateValidationSchema.pick({
  email: true,
  password: true,
})

export type TUserCredential = z.infer<typeof userLoginValidationSchema>
