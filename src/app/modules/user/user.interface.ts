import { Model, ObjectId } from 'mongoose'

export interface IUser {
  id?: ObjectId
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: 'user' | 'admin'
}

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>
  userWithoutPassword(id: ObjectId): Promise<IUser | null>
}
