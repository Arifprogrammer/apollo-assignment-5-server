import { Router } from 'express'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import {
  createBooking,
  createPaymentIntent,
  deleteBooking,
  getAllBooking,
  getMyBookings,
  updateBooking,
} from './booking.controller'
import {
  bookingCreateValidationSchema,
  bookingUpdateValidationSchema,
} from './booking.validation'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'

const router = Router()

router.post(
  '/',
  authenticateToken('user'),
  validateBody(bookingCreateValidationSchema),
  createBooking,
)
router.post(
  '/create-payment-intent',
  authenticateToken('user'),
  createPaymentIntent,
)
router.get('/', authenticateToken('admin'), getAllBooking)
router.get('/my-bookings', authenticateToken('user'), getMyBookings)
router.put(
  '/:id',
  authenticateToken('admin'),
  validateBody(bookingUpdateValidationSchema),
  updateBooking,
)
router.delete('/:id', authenticateToken('admin'), deleteBooking)

export const bookingRouter = router
