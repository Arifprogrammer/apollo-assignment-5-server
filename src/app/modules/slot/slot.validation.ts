import { ObjectId } from 'mongoose'
import { z } from 'zod'

export const slotCreateValidationSchema = z
  .object({
    room: z
      .string({
        required_error: 'A room reference is required to book a slot',
        invalid_type_error: 'The room id must be a string value',
      })
      .trim(),
    date: z.string({
      required_error: 'The date of the booking is required',
      invalid_type_error: 'The date must be a string value',
    }),
    startTime: z
      .string({
        required_error: 'The start time of the slot is required',
        invalid_type_error: 'The start time must be a string value',
      })
      .trim()
      .refine(
        startTime => {
          const timeRegex = /^([0-1][0-9]|2[0-3]):([0][0])$/ // Valid time format (HH:MM)
          return timeRegex.test(startTime)
        },
        {
          message:
            'Invalid start time format , expected "HH:00" in 24 hours format',
        },
      ),
    endTime: z
      .string({
        required_error: 'The end time of the slot is required',
        invalid_type_error: 'The end time must be a string value',
      })
      .trim()
      .refine(
        endTime => {
          const timeRegex = /^([0-1][0-9]|2[0-3]):([0][0])$/ // Valid time format (HH:MM)
          return timeRegex.test(endTime)
        },
        {
          message:
            'Invalid end time format , expected "HH:00" in 24 hours format',
        },
      ),
    isBooked: z
      .boolean({
        required_error:
          'A boolean value is required to indicate if the slot is booked',
        invalid_type_error: 'The isBooked property must be a boolean value',
      })
      .default(false),
  })
  .refine(
    schemaBody => {
      const startTime = new Date(`1996-10-07T${schemaBody.startTime}:00`)
      const endTime = new Date(`1996-10-07T${schemaBody.endTime}:00`)

      return endTime > startTime
    },
    {
      message: 'Start time should be before End time!',
    },
  )

export type TSlot = Omit<z.infer<typeof slotCreateValidationSchema>, 'room'> & {
  room: ObjectId
}
