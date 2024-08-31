import { ObjectId } from 'mongoose'
import { z } from 'zod'

export const bookingCreateValidationSchema = z.object({
  room: z
    .string({
      required_error: 'Room Id is required',
      invalid_type_error: 'Room Id must be a string',
    })
    .trim(),
  slots: z.string().array().min(1, {
    message: 'At least one slot Id is required',
  }),
  user: z
    .string({
      required_error: 'User Id is required',
      invalid_type_error: 'User Id must be a string',
    })
    .trim(),
  date: z
    .string({
      required_error: 'Booking date is required',
      invalid_type_error: 'Booking date must be a string',
    })
    .trim(),
  isConfirmed: z
    .enum(['confirmed', 'unconfirmed', 'canceled'], {
      required_error: 'Booking status is required',
      invalid_type_error:
        'Booking status must be one of "confirmed", "unconfirmed", or "canceled"',
    })
    .default('unconfirmed'),
  isDeleted: z
    .boolean({
      required_error: 'Deleted status is required',
      invalid_type_error: 'Deleted status must be a boolean',
    })
    .default(false),
})

export const bookingUpdateValidationSchema = bookingCreateValidationSchema
  .pick({ date: true, isConfirmed: true, isDeleted: true })
  .partial()

export type TBooking = Omit<
  z.infer<typeof bookingCreateValidationSchema>,
  'user' | 'room'
> & { user: ObjectId; room: ObjectId; totalAmount: number }
