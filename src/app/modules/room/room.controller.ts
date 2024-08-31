import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { RoomService } from './room.service'
import { ObjectId } from 'mongoose'

export const createRoom = catchAsync(async (req, res) => {
  const room = req.body
  const data = await RoomService.createRoom(room)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room added successfully',
  })
})

export const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await RoomService.getSingleRoom(id as unknown as ObjectId)

  if (!data) {
    respond(res, {
      data,
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
    })
  }

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room retrieved successfully',
  })
})

export const getAllRoom = catchAsync(async (req, res) => {
  const data = await RoomService.getAllRoom()

  if (!data.length) {
    respond(res, {
      data,
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
    })
  }

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rooms retrieved successfully',
  })
})

export const updateRoom = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await RoomService.updateRoom(id as unknown as ObjectId, req.body)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room updated successfully',
  })
})

export const deleteRoom = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await RoomService.deleteRoom(id as unknown as ObjectId)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room deleted successfully',
  })
})
