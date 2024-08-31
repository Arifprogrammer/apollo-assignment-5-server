import { Router } from 'express'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import {
  roomCreateValidationSchema,
  roomUpdateValidationSchema,
} from './room.validation'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import {
  createRoom,
  getSingleRoom,
  getAllRoom,
  updateRoom,
  deleteRoom,
} from './room.controller'

const router = Router()

router.post(
  '/',
  authenticateToken('admin'),
  validateBody(roomCreateValidationSchema),
  createRoom,
)

router.get('/:id', getSingleRoom)
router.get('/', getAllRoom)
router.put(
  '/:id',
  authenticateToken('admin'),
  validateBody(roomUpdateValidationSchema),
  updateRoom,
)
router.delete('/:id', authenticateToken('admin'), deleteRoom)

export const roomRouter = router
