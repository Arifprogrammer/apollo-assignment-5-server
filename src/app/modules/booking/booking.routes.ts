import { Router } from 'express'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import {
  createBooking,
  deleteBooking,
  getAllBooking,
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
  '/',
  authenticateToken(),
  validateBody(bookingCreateValidationSchema),
  createBooking,
)
router.get('/', authenticateToken('admin'), getAllBooking)
router.get('/my-bookings', authenticateToken(), getMyBooking)
router.put(
  '/:id',
  authenticateToken('admin'),
  validateBody(bookingUpdateValidationSchema),
  updateBooking,
)
router.delete('/:id', authenticateToken('admin'), deleteBooking)

export const bookingRouter = router
