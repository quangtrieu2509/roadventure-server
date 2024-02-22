import { type Request, type Response, type NextFunction } from 'express'
import httpStatus from 'http-status'

import { userInteractRepo, userRepo } from '../repositories'
import { getApiResponse, getIdFromPayload } from '../utils'
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
    const user = await userRepo.getUserProfile({ username: req.params.username })
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
    const desUserId = await userRepo.getUserId({ username: req.params.username })
    if (desUserId !== null) {
      const srcUserId = getIdFromPayload(req)
      const interact = await userInteractRepo.getInteract({ srcUserId, desUserId })

      if (interact !== null) {
        await userInteractRepo.updateInteract({ srcUserId, desUserId }, req.body)
      } else {
        await userInteractRepo.createInteract({ srcUserId, desUserId, ...req.body })
      }

      return res.status(httpStatus.OK).json(getApiResponse(messages.OK))
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .json(getApiResponse(messages.NOT_FOUND))
    }
  } catch (error) {
    next(error)
  }
}

const getUserDTO = (user: IUser): object => {
  const { password, email, phoneNumber, accountType, isActivated, ...rest } = user
  return rest
}
