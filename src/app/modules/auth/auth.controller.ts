import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { AuthService } from './auth.service'

export const createUser = catchAsync(async (req, res) => {
  const user = req.body
  const data = await AuthService.createUser(user)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
  })
})

export const loginUser = catchAsync(async (req, res) => {
  const credentials = req.body
  const { userWithOutPass, token } = await AuthService.loginUser(credentials)

  respond(res, {
    data: userWithOutPass,
    token,
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
  })
})
