import { type Request, type Response, type NextFunction } from 'express'
import httpStatus from 'http-status'

import { type ITrip, type IUser, type RequestPayload } from '../types'
import { tripInteractRepo, tripRepo, userRepo } from '../repositories'
import { getApiResponse, getIdFromPayload } from '../utils'
import { interactTypes, messages, privacies } from '../constants'

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerId = getIdFromPayload(req)
    const newTrip = await tripRepo.createTrip({ ...req.body, ownerId })
    // const newTrip = { ...req.body, ownerId }
    // console.log(newTrip)
    return res.status(httpStatus.OK).json(getApiResponse({ data: newTrip }))
  } catch (error) {
    next(error)
  }
}

export const getTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getIdFromPayload(req)
    const trip = await tripRepo.findTrip({ id: req.params.tripId })
    const owner = await userRepo.getUser({ id: trip?.ownerId })

    if (trip === null) return res.status(httpStatus.NOT_FOUND).json(getApiResponse(messages.NOT_FOUND))

    const quantity = await tripInteractRepo.getInteractQuantity(trip.id)
    const comments = await tripInteractRepo.getComments({ tripId: trip.id, type: interactTypes.COMMENT })
    const liked = await tripInteractRepo.checkExistedInteract({
      userId,
      tripId: trip.id,
      type: interactTypes.LIKE
    })
    const saved = await tripInteractRepo.checkExistedInteract({
      userId,
      tripId: trip.id,
      type: interactTypes.SAVE
    })

    const tripDto = getTripDto(userId, trip, owner as IUser, { ...quantity, liked, saved }, comments)

    return res.status(httpStatus.OK).json(getApiResponse({ data: tripDto }))
  } catch (error) {
    next(error)
  }
}

export const getUserTrips = async (
  req: RequestPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getIdFromPayload(req)
    const owner = await userRepo.getUser({ username: req.params.username })

    const filter = (userId === owner?.id) ? {} : { privacy: privacies.PUBLIC }
    const trips = await tripRepo.getTrips({ ownerId: owner?.id, ...filter })

    const tripDtos: object[] = []

    for (const trip of trips) {
      const quantity = await tripInteractRepo.getInteractQuantity(trip.id)
      const liked = await tripInteractRepo.checkExistedInteract({
        userId,
        tripId: trip.id,
        type: interactTypes.LIKE
      })
      const saved = await tripInteractRepo.checkExistedInteract({
        userId,
        tripId: trip.id,
        type: interactTypes.SAVE
      })
      const comments = await tripInteractRepo.getComments({ tripId: trip.id, type: interactTypes.COMMENT })

      tripDtos.push(
        getTripDto(userId, trip, owner as IUser, { ...quantity, liked, saved }, comments)
      )
    }

    return res.status(httpStatus.OK).json(getApiResponse({ data: tripDtos }))
  } catch (error) {
    next(error)
  }
}

export const getSavedTrips = async (
  req: RequestPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getIdFromPayload(req)
    const trips = await tripInteractRepo.getSavedTrips(userId)

    return res.status(httpStatus.OK).json(getApiResponse({ data: trips }))
  } catch (error) {
    next(error)
  }
}

export const getOwnedTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK)
  } catch (error) {
    next(error)
  }
}

export const updateTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK)
  } catch (error) {
    next(error)
  }
}

export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK)
  } catch (error) {
    next(error)
  }
}

export const interactTrip = async (
  req: RequestPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getIdFromPayload(req)
    const tripId = req.params.tripId
    const { type, value } = req.body

    if (!(value as boolean)) {
      await tripInteractRepo.deleteInteract({ userId, tripId, type })
    } else if (type === interactTypes.COMMENT) {
      await tripInteractRepo.createInteract({ ...req.body, userId, tripId })
    } else {
      const interactId = await tripInteractRepo.checkExistedInteract({ userId, tripId, type })
      if (!interactId) {
        await tripInteractRepo.createInteract({ ...req.body, userId, tripId })
      }
    }
    return res.status(httpStatus.OK).json(getApiResponse(messages.OK))
  } catch (error) {
    next(error)
  }
}

const getTripDto = (
  userId: string,
  trip: ITrip,
  owner: IUser,
  interact: object,
  comments: object[]
): object => {
  const { ownerId, ...rest } = trip
  return {
    ...rest,
    owner: {
      id: owner.id,
      givenName: owner.givenName,
      familyName: owner.familyName,
      username: owner.username,
      picture: owner.picture
    },
    interact,
    isOwner: (owner.id === userId),
    comments
  }
}
