import { Router } from 'express'

import userRouters from './user.route'

const router = Router()

router.use('/users', userRouters)

export default router
