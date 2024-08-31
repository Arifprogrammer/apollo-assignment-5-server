import { z } from 'zod'

export const roomCreateValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .trim(),
  roomNo: z
    .number({
      required_error: 'Room number is required',
      invalid_type_error: 'Room number must be a number',
    })
    .positive('Room number must be a positive value')
    .int('Room number must be an integer'),
  floorNo: z
    .number({
      required_error: 'Floor number is required',
      invalid_type_error: 'Floor number must be a number',
    })
    .positive('Floor number must be a positive value')
    .int('Floor number must be an integer'),
  capacity: z
    .number({
      required_error: 'Capacity is required',
      invalid_type_error: 'Capacity must be a number',
    })
    .positive('Capacity must be a positive value')
    .int('Capacity must be an integer'),
  pricePerSlot: z
    .number({
      required_error: 'Price per slot is required',
      invalid_type_error: 'Price per slot must be a number',
    })
    .positive('Price per slot must be a positive value'),
  amenities: z.string().array().default([]),
  isDeleted: z
    .boolean({
      invalid_type_error: 'isDeleted must be a boolean',
    })
    .default(false),
})

export const roomUpdateValidationSchema = roomCreateValidationSchema.partial()

export type TRoom = z.infer<typeof roomCreateValidationSchema>
