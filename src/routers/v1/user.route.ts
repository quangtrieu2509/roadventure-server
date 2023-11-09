import { Router } from 'express'

import { userControllers as controller } from '../../controllers'
import { userValidation as validation } from '../../validations'
import { verifyToken } from '../../middlewares'

const router = Router()

router
  .route('/')
  .post(validation.createUser, controller.createUser)
  .get(verifyToken, validation.getUser, controller.getUser)

export default router
