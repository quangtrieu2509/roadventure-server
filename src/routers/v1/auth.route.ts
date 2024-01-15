import { Router } from 'express'
// import passport from 'passport'
// import { createToken, getApiResponse } from '../../utils'
// import type { IUser } from '../../types'
// import httpStatus from 'http-status'
// import { messages } from '../../constants'
import { authControllers } from '../../controllers'
import { verifyGoogleToken } from '../../middlewares'

const router = Router()

router.route('/google')
  .get(verifyGoogleToken, authControllers.signInByGoogle)
  .post(verifyGoogleToken, authControllers.signUpByGoogle)

router.route('/email')
  .post(authControllers.signInByEmail)

router.route('/email/signup')
  .post(authControllers.signUpByEmail)

// router.route('/google').get(
//   // (req, res, next) => { console.log('google'); next() },
//   passport.authenticate('google', { scope: ['email', 'profile'] })
// )

// router.route('/google/callback').get(
//   // (req, res, next) => { console.log('google callback'); next() },
//   passport.authenticate('google', {
//     failureRedirect: '/health'
//     // successRedirect: 'http://localhost:3001/'
//   }), authControllers.handleSignInByGoogle
//   // (req, res, next) => {
//   //   try {
//   //     if (req.user === messages.CHANGE_ACCOUNT_TYPE) {
//   //       return res
//   //         .status(httpStatus.OK)
//   //         .json(getApiResponse(messages.CHANGE_ACCOUNT_TYPE))
//   //     }
//   //     const { id, givenName, familyName, email, role } = req.user as IUser
//   //     const accessToken = createToken(
//   //       { id, givenName, familyName, email, role }
//   //     )
//   //     return res
//   //       .status(httpStatus.OK)
//   //       .json(getApiResponse({ data: { user: req.user, accessToken } }))
//   //   } catch (error) {
//   //     next(error)
//   //   }
//   // }
// )

export default router
