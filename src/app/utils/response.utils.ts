import { Response } from 'express'
import { shake } from 'radash'

export function respond(
  res: Response,
  input: {
    data?: unknown
    success: boolean
    statusCode: number
    message?: string
    [key: string]: unknown
  },
) {
  const { data, statusCode, message, success, token } = input

  return res.status(statusCode).json(
    shake({
      statusCode,
      success,
      message,
      data,
      token,
    }),
  )
}
