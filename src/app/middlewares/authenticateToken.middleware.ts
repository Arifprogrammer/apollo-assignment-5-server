import { RequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'

export const authenticateToken = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] as string

    jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
      if (err)
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        )
      const user = decoded as JwtPayload
      req.user = user

      if (roles.length && !roles.includes(user.role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        )
      }

      next()
    })
  }
}
