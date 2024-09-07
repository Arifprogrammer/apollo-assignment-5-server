import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync.utils'
import { respond } from '../../utils/response.utils'
import { ObjectId } from 'mongoose'
import { BookingService } from './booking.service'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY!)

export const createBooking = catchAsync(async (req, res) => {
  const booking = req.body
  const data = await BookingService.createBooking(booking)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
  })
})

export const createPaymentIntent = catchAsync(async (req, res) => {
  const { price } = req.body
  const amount = price * 100
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  })

  respond(res, {
    clientSecret: paymentIntent.client_secret,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
  })
})

export const getAllBooking = catchAsync(async (req, res) => {
  const data = await BookingService.getAllBooking()

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
    message: 'All bookings retrieved successfully',
  })
})

export const getMyBookings = catchAsync(async (req, res) => {
  const user = req.user
  const data = await BookingService.getMyBooking(user.email)

  if (!data.length) {
    respond(res, {
      data,
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Booking Found',
    })
  }

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
  })
})

export const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await BookingService.updateBooking(
    id as unknown as ObjectId,
    req.body,
  )

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully',
  })
})

export const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await BookingService.deleteBooking(id as unknown as ObjectId)

  respond(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking deleted successfully',
  })
})
