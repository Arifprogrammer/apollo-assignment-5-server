import { Router } from 'express'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import {
  createBooking,
  deleteBooking,
  getMyBooking,
  updateBooking,
} from './booking.controller'
import {
  bookingCreateValidationSchema,
  bookingUpdateValidationSchema,
} from './booking.validation'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'

const router = Router()

router.post(
  '/bookings',
  authenticateToken(),
  validateBody(bookingCreateValidationSchema),
  createBooking,
)

router.get('/my-bookings', authenticateToken(), getMyBooking)
router.put(
  '/bookings/:id',
  authenticateToken('admin'),
  validateBody(bookingUpdateValidationSchema),
  updateBooking,
)
router.delete('/bookings/:id', authenticateToken('admin'), deleteBooking)

export const bookingRouter = router
