import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import bcrypt from 'bcrypt'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { TUserCredential } from './auth.validation'
import { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { ObjectId } from 'mongoose'

class Service {
  async createUser(user: IUser) {
    if (await User.isUserExist(user.email)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'The user is already exist')
    }

    const newUser = await User.create(user)
    const userWithOutPass = await User.userWithoutPassword(newUser.id)

    return userWithOutPass
  }

  async loginUser(credentials: TUserCredential) {
    const existingUser = await User.isUserExist(credentials.email)

    if (!existingUser) {
      throw new AppError(httpStatus.BAD_REQUEST, `The user doesn't exist`)
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      existingUser.password,
    )

    if (!passwordMatch) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password')
    }

    const token = this.createToken(existingUser.email, existingUser.role)
    const userWithOutPass = await User.userWithoutPassword(
      existingUser.id as ObjectId,
    )

    return { userWithOutPass, token }
  }

  private createToken(email: string, role: string) {
    const payload: JwtPayload = {
      email: email,
      role: role,
    }

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.Access_Token_Expiration,
    })
  }
}

export const AuthService = new Service()
