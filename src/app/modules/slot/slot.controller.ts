import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { SlotService } from './slot.service'
import { ObjectId } from 'mongoose'

export const createSlot = catchAsync(async (req, res) => {
  const slot = req.body
  const data = await SlotService.createSlot(slot)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
  })
})

export const getAllSlots = catchAsync(async (req, res) => {
  const { date, roomId: room } = req.query
  const data = await SlotService.getAllSlots({ date, room } as {
    date: unknown
    room: unknown
  } as {
    date: string
    room: ObjectId
  })

  if (!data.length) {
    respond(res, {
      data,
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Slot Available',
    })
  }

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
  })
})

export const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params
  const slot = req.body
  const data = await SlotService.updateSlot(slot, id)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots updated successfully',
  })
})

export const deleteSlot = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await SlotService.deleteSlot(id)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots deleted successfully',
  })
})
