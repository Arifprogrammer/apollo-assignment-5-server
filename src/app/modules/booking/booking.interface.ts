import { Model, ObjectId } from 'mongoose'
import { TBooking } from './booking.validation'

export interface BookingModel extends Model<TBooking> {
  isBookingExist(id: ObjectId): Promise<TBooking | null>
}
