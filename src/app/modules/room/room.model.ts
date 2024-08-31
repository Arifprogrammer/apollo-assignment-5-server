import { Schema, model, ObjectId } from 'mongoose'
import { TRoom } from './room.validation'
import { RoomModel } from './room.interface'

const roomSchema = new Schema<TRoom, RoomModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: 1,
      trim: true,
    },
    roomNo: {
      type: Number,
      required: [true, 'Room number is required'],
      min: [0, 'Room no must be greater than 0'],
      trim: true,
    },
    floorNo: {
      type: Number,
      required: [true, 'Floor number is required'],
      min: [0, 'Floor no must be greater than 0'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [0, 'Room capacity must be greater than 0'],
      trim: true,
    },
    pricePerSlot: {
      type: Number,
      required: [true, 'Price per slot is required'],
      min: [0, 'Price per slot must be greater than 0'],
      trim: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
)

roomSchema.statics.isRoomExist = async (id: ObjectId) => {
  return await Room.findById({ _id: id })
}

export const Room = model<TRoom, RoomModel>('Room', roomSchema)
