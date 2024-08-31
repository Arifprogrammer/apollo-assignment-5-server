import { Model, ObjectId } from 'mongoose'
import { TRoom } from './room.validation'

export interface RoomModel extends Model<TRoom> {
  isRoomExist(id: ObjectId): Promise<TRoom | null>
}
