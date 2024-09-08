import { Router } from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import {
  slotCreateValidationSchema,
  slotUpdateValidationSchema,
} from './slot.validation'
import { createSlot, getAllSlots, updateSlot } from './slot.controller'

const router = Router()

router.post(
  '/',
  authenticateToken('admin'),
  validateBody(slotCreateValidationSchema),
  createSlot,
)

router.patch(
  '/update/:id',
  authenticateToken('admin'),
  validateBody(slotUpdateValidationSchema),
  updateSlot,
)
router.get('/availability', authenticateToken(), getAllSlots)

export const slotRouter = router
