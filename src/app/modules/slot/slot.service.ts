import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Room } from '../room/room.model'
import { TSlot } from './slot.validation'
import { Slot } from './slot.model'
import { list, shake } from 'radash'
import { ObjectId } from 'mongoose'

class Service {
  async createSlot(slot: TSlot) {
    const room = await Room.isRoomExist(slot.room)
    if (!room) throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist')

    const { startHour, endHour } = this.extractHours(
      slot.startTime,
      slot.endTime,
    )

    const times = list(startHour, endHour)
    times.pop()

    const slots: TSlot[] = []
    for (const time of times) {
      const isCreatedSlot = await Slot.findOne({
        date: slot.date,
        room: slot.room,
        startTime: `${time}:00`,
      })

      if (isCreatedSlot)
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Slot already created between this time',
        )

      slots.push({
        ...slot,
        startTime: `${time < 10 ? '0' + time : time}:00`,
        endTime: `${time < 9 ? '0' + (time + 1) : time + 1}:00`,
      })
    }

    return await Slot.create(slots)
  }

  async getAllSlots(queryParams: Pick<TSlot, 'date' | 'room'>) {
    const { date, room } = queryParams

    if (!Object.values(shake(queryParams)).length) {
      return await Slot.find({ isBooked: false }).populate('room')
    }

    return await Slot.find({
      $and: [
        {
          date,
        },
        {
          room,
        },
        {
          isBooked: false,
        },
      ],
    })
  }

  async updateSlot(slot: TSlot, id: string) {
    const isExistSlot = await Slot.findById({ _id: id })

    if (!isExistSlot)
      throw new AppError(httpStatus.BAD_REQUEST, 'Slot does not exist')

    const { startHour, endHour } = this.extractHours(
      slot.startTime,
      slot.endTime,
    )

    const isCreatedSlot = await Slot.findOne({
      date: slot.date,
      room: slot.room,
      startTime: `${startHour}:00`,
    })

    if (isCreatedSlot)
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Slot already created between this time',
      )

    return await Slot.updateOne(
      { _id: id },
      {
        startTime: `${startHour}:00`,
        endTime: `${endHour}:00`,
      },
    )
  }

  async deleteSlot(id: ObjectId | string) {
    const isExistSlot = await Slot.findById({ _id: id })

    if (!isExistSlot)
      throw new AppError(httpStatus.BAD_REQUEST, 'Slot does not exist')

    return await Slot.deleteOne({ _id: id })
  }

  private extractHours(
    startTime: string,
    endTime: string,
  ): { startHour: number; endHour: number } {
    const startHour = Number(startTime.split(':')[0]) //* extracting hour only "10:00" -> 10
    const endHour = Number(endTime.split(':')[0]) //* extracting hour only "12:00" -> 12
    return { startHour, endHour }
  }
}

export const SlotService = new Service()
