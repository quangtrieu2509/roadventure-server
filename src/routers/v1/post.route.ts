import { Router } from 'express'

import { postControllers as controller } from '../../controllers'
import { verifyToken } from '../../middlewares'

const router = Router()

router
  .route('/')
  .post(verifyToken, controller.createPost)
  .get(verifyToken, controller.getOwnedPosts)

router
  .route('/:postId')
  .get(verifyToken, controller.getPost)
  .put(verifyToken, controller.updatePost)
  .delete(verifyToken, controller.deletePost)

router
  .route('/interact/:postId')
  .put(verifyToken, controller.interactPost)

export default router
