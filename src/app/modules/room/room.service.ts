import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Room } from './room.model'
import { TRoom } from './room.validation'
import { ObjectId } from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'

class Service {
  async createRoom(room: TRoom) {
    if (await Room.findOne({ roomNo: room.roomNo })) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room already exist')
    }
    return await Room.create(room)
  }

  async getSingleRoom(id: ObjectId) {
    const room = await Room.isRoomExist(id)
    return room
  }

  async getAllRoom(query: Record<string, unknown>) {
    const roomQuery = new QueryBuilder(Room.find(), query)
      .search(['name'])
      .sort()
      .paginate()
      .fields()

    const result = await roomQuery.modelQuery
    const meta = await roomQuery.countTotal()

    return {
      meta,
      result,
    }
  }

  async updateRoom(id: ObjectId, data: Partial<TRoom>) {
    if (!(await Room.isRoomExist(id))) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist')
    }

    return await Room.findOneAndUpdate({ _id: id }, data, { new: true })
  }

  async deleteRoom(id: ObjectId) {
    if (!(await Room.isRoomExist(id))) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist')
    }

    return await Room.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    )
  }
}

export const RoomService = new Service()
