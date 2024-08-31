import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import mongoose, { ObjectId } from 'mongoose'
import { Booking } from './booking.model'
import { TBooking } from './booking.validation'
import { Slot } from '../slot/slot.model'
import { Room } from '../room/room.model'
import { User } from '../user/user.model'

class Service {
  async createBooking(booking: TBooking) {
    const availableSlots = await Slot.find({
      _id: { $in: booking.slots },
    })

    if (availableSlots.length !== booking.slots.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'There is one or multiple slots do not exist',
      )
    }

    const bookedSlots = await Slot.find({
      _id: { $in: booking.slots },
      isBooked: true,
    })

    if (bookedSlots.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'There is one or multiple slots are already booked',
      )
    }

    const room = await Room.isRoomExist(booking.room)

    if (!room) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist')
    }

    const user = await User.findById({ _id: booking.user })

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist')
    }

    const bookingSlot = await this.updateSlotsAndCreateBooking(
      booking,
      room.pricePerSlot,
    )

    return await Booking.findById({ _id: bookingSlot._id })
      .populate('slots')
      .populate('room')
      .populate({ path: 'user', select: '-password' })
  }

  async getMyBooking(userEmail: string) {
    const user = await User.findOne({ email: userEmail }).select('-password')

    return await Booking.find({ user: user?._id })
      .populate('slots')
      .populate('room')
      .select('-user')
  }

  async updateBooking(id: ObjectId, data: Partial<TBooking>) {
    if (!(await Booking.isBookingExist(id))) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Booking does not exist')
    }

    return await Booking.findOneAndUpdate({ _id: id }, data, { new: true })
  }

  async deleteBooking(id: ObjectId) {
    if (!(await Booking.isBookingExist(id))) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Booking does not exist')
    }

    return await Booking.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    )
  }

  private async updateSlotsAndCreateBooking(
    booking: TBooking,
    pricePerSlot: number,
  ) {
    const session = await mongoose.startSession()

    try {
      session.startTransaction()

      const updateSlots = await Slot.updateMany(
        {
          _id: { $in: booking.slots },
        },
        { isBooked: true },
        {
          new: true,
          session,
        },
      )

      if (!updateSlots.modifiedCount)
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book slots')

      booking.totalAmount = pricePerSlot * booking.slots.length
      const bookingSlot = await Booking.create([booking], { session })

      if (!bookingSlot.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking')
      }

      await session.commitTransaction()
      await session.endSession()

      return bookingSlot[0]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      await session.abortTransaction()
      await session.endSession()
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export const BookingService = new Service()
