import { Router } from 'express'

import userRouters from './user.route'
import authRouters from './auth.route'
import tripRouters from './trip.route'
import postRouters from './post.route'

const router = Router()

router.use('/user', userRouters)
router.use('/auth', authRouters)
router.use('/trip', tripRouters)
router.use('/post', postRouters)

export default router
