import { type Request, type Response, type NextFunction } from 'express'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'

import { userRepo } from '../repositories'
import { createToken, getApiResponse } from '../utils'
import { accountTypes } from '../constants/account-types'
import { messages, roles } from '../constants'
import type { IUser, RequestPayload } from '../types'

interface GoogleUser {
  email: string
  given_name: string
  family_name: string
}

export const signUpByGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body

    let user = await userRepo.findUser({ username: body.username })

    if (user == null) {
      const newUser = {
        ...body,
        accountType: accountTypes.GOOGLE,
        role: roles.USER
      }
      user = await userRepo.createUser(newUser as unknown as IUser)

      const accessToken = createToken(
        { id: user.id, email: user.email, role: user.role }
      )
      return res
        .status(httpStatus.OK)
        .json(getApiResponse({ data: { user, accessToken } }))
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(getApiResponse(messages.USERNAME_EXISTED))
    }
  } catch (error) {
    next(error)
  }
}

export const signInByGoogle = async (
  req: RequestPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { email, given_name, family_name } = req.payload as GoogleUser
    const user = await userRepo.findUser({ email })

    // if email do not exist yet
    if (user == null) {
      const userInfor = {
        email,
        givenName: given_name,
        familyName: family_name
      }
      return res
        .status(httpStatus.OK)
        .json(getApiResponse({ ...messages.CONTINUE_SIGN_IN, data: userInfor }))
    // if email exist already
    } else {
      delete user.password
      const accessToken = createToken(
        { id: user.id, email: user.email, role: user.role }
      )

      if (user.accountType === accountTypes.EMAIL) {
        await userRepo.updateUser({ id: user.id }, { accountType: accountTypes.GOOGLE })
        return res
          .status(httpStatus.OK)
          .json(getApiResponse({ ...messages.CONNECT_GOOGLE_ACCOUNT, data: { user, accessToken } }))
      } else {
        return res
          .status(httpStatus.OK)
          .json(getApiResponse({ data: { user, accessToken } }))
      }
    }
  } catch (error) {
    next(error)
  }
}

export const signInByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await userRepo.findUser({ email })
    const isMatch = await bcrypt.compare(password, user?.password ?? '')

    // if email existed
    if (user !== null && isMatch) {
      delete user.password

      const accessToken = createToken(
        { id: user.id, email: user.email, role: user.role }
      )
      return res
        .status(httpStatus.OK)
        .json(getApiResponse({ data: { user, accessToken } }))
    // if email did not exist
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(getApiResponse(messages.SIGN_IN_ERROR))
    }
  } catch (error) {
    next(error)
  }
}

export const signUpByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body
    let user = await userRepo.findUser({ username: body.username })

    // if username do not exist yet
    if (user == null) {
      user = await userRepo.findUser({ email: body.email })

      if (user == null) {
        const newUser = {
          ...body,
          accountType: accountTypes.EMAIL,
          role: roles.USER
        }
        user = await userRepo.createUser(newUser as unknown as IUser)

        const accessToken = createToken(
          { id: user.id, email: user.email, role: user.role }
        )

        delete user.password

        return res
          .status(httpStatus.OK)
          .json(getApiResponse({ data: { user, accessToken } }))
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(getApiResponse(messages.EMAIL_EXISTED))
      }
    // if username exist already
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(getApiResponse(messages.USERNAME_EXISTED))
    }
  } catch (error) {
    next(error)
  }
}
