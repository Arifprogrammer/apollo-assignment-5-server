import { Schema, model } from 'mongoose'
import { TSlot } from './slot.validation'

const slotSchema = new Schema<TSlot>(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: [true, 'A room reference is required to book a slot'],
      ref: 'Room',
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'The date of the booking is required'],
    },
    startTime: {
      type: String,
      required: [true, 'The start time of the slot is required'],
      trim: true,
    },
    endTime: {
      type: String,
      required: [true, 'The end time of the slot is required'],
      trim: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
)

export const Slot = model<TSlot>('Slot', slotSchema)
