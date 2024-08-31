import { Router } from 'express'
import { authenticateToken } from '../../middlewares/authenticateToken.middleware'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import { slotCreateValidationSchema } from './slot.validation'
import { createSlot, getAllSlots } from './slot.controller'

const router = Router()

router.post(
  '/',
  authenticateToken('admin'),
  validateBody(slotCreateValidationSchema),
  createSlot,
)
router.get('/availability', getAllSlots)

export const slotRouter = router
