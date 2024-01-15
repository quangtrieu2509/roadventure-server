import { type Request, type Response, type NextFunction } from 'express'
import httpStatus from 'http-status'

import { type RequestPayload } from '../types'

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(httpStatus.OK)
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
    return res.status(httpStatus.OK)
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
    return res.status(httpStatus.OK)
  } catch (error) {
    next(error)
  }
}
