import { ObjectId, Schema, Types, model } from 'mongoose'
import { TBooking } from './booking.validation'
import { BookingModel } from './booking.interface'

const bookingSchema = new Schema<TBooking, BookingModel>(
  {
    room: {
      type: Types.ObjectId,
      required: [true, 'Room Id is required'],
      trim: true,
      ref: 'Room',
    },
    slots: {
      type: [Types.ObjectId],
      required: [true, 'At least one slot Id is required'],
      minlength: [1, 'At least one slot Id is required'],
      ref: 'Slot',
    },
    user: {
      type: Types.ObjectId,
      required: [true, 'User Id is required'],
      trim: true,
      ref: 'User',
    },
    date: {
      type: String,
      required: [true, 'Booking date is required'],
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
    },
    isConfirmed: {
      type: String,
      enum: ['confirmed', 'unconfirmed', 'canceled'],
      required: [true, 'Booking status is required'],
      default: 'unconfirmed',
    },
    isDeleted: {
      type: Boolean,
      required: [true, 'Deleted status is required'],
      default: false,
    },
  },
  {
    versionKey: false,
  },
)

bookingSchema.statics.isBookingExist = async (id: ObjectId) => {
  return await Booking.findById({ _id: id })
}

export const Booking = model<TBooking, BookingModel>('Booking', bookingSchema)
