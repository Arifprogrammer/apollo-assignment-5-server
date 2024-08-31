import { Router } from 'express'
import { validateBody } from '../../middlewares/validate-zod.middleware'
import { createUser, loginUser } from './auth.controller'
import {
  userCreateValidationSchema,
  userLoginValidationSchema,
} from './auth.validation'

const router = Router()

router.post('/register', validateBody(userCreateValidationSchema), createUser)
router.post('/login', validateBody(userLoginValidationSchema), loginUser)

export const authRouter = router
