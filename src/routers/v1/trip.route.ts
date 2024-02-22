import { Router } from 'express'

import { tripControllers as controller } from '../../controllers'
import { verifyToken } from '../../middlewares'

const router = Router()

router
  .route('/')
  .post(verifyToken, controller.createTrip)
  .get(verifyToken, controller.getOwnedTrips)

router
  .route('/saved')
  .get(verifyToken, controller.getSavedTrips)

router
  .route('/:username/trips')
  .get(verifyToken, controller.getUserTrips)

router
  .route('/detail/:tripId')
  .get(verifyToken, controller.getTrip)
  .put(verifyToken, controller.updateTrip)
  .delete(verifyToken, controller.deleteTrip)

router
  .route('/interact/:tripId')
  .post(verifyToken, controller.interactTrip)

export default router
