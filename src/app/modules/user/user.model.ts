import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: 4,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
  },
  { versionKey: false },
)

//* static middleware to check user is already exist or not
userSchema.statics.isUserExist = async email => {
  return await User.findOne({ email })
}

userSchema.statics.userWithoutPassword = async id => {
  return await User.findById({ _id: id }).select('-password')
}

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  //* hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.salt_round))
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
