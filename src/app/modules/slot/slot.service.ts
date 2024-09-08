import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Room } from '../room/room.model'
import { TSlot } from './slot.validation'
import { Slot } from './slot.model'
import { /* list, */ shake } from 'radash'

class Service {
  async createSlot(slot: TSlot) {
    const room = await Room.isRoomExist(slot.room)
    if (!room) throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist')
    const { startHour, endHour } = this.extractHours(
      slot.startTime,
      slot.endTime,
    )
    const slotsCount = endHour - startHour

    const slots: TSlot[] = []
    let currentStartTime = startHour - 1

    for (let index = 0; index < slotsCount; index++) {
      currentStartTime += 1
      const currentEndTime = currentStartTime + 1

      slots.push({
        ...slot,
        startTime: `${currentStartTime.toString()}:00`,
        endTime: `${currentEndTime.toString()}:00`,
      })
    }
    return await Slot.create(slots)
  }

  async getAllSlots(queryParams: Pick<TSlot, 'date' | 'room'>) {
    const { date, room } = queryParams

    if (room && !(await Room.isRoomExist(room))) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist')
    }

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

    /* const times = list(startHour, endHour)
    times.pop()

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
    } */

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

    return await Slot.updateOne({
      _id: id,
      startTime: `${startHour}:00`,
      endTime: `${endHour}:00`,
    })
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
