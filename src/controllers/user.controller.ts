import { type Request, type Response, type NextFunction } from 'express'
import httpStatus from 'http-status'

import { userRepo } from '../repositories'
import { getApiResponse } from '../utils'
import { messages } from '../constants'
import { type RequestPayload, type IUser } from '../types'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createUser = await userRepo.createUser(req.body)
    res.status(httpStatus.OK).json(getApiResponse({ data: createUser }))
  } catch (error) {
    next(error)
  }
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userRepo.findUser({ username: req.params.username })
    if (user !== null) {
      return res.status(httpStatus.OK).json(getApiResponse({ data: getUserDTO(user) }))
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .json(getApiResponse(messages.NOT_FOUND))
    }
  } catch (error) {
    next(error)
  }
}

export const interactUser = async (
  req: RequestPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK)
  } catch (error) {
    next(error)
  }
}

const getUserDTO = (user: IUser): object => {
  const { password, email, phoneNumber, accountType, isActivated, ...rest } = user
  return rest
}
