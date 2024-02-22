import { type Request, type Response, type NextFunction } from 'express'
import httpStatus from 'http-status'

import { type RequestPayload } from '../types'

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(httpStatus.OK).json('createPost')
  } catch (error) {
    next(error)
  }
}

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK).json('getPost')
  } catch (error) {
    next(error)
  }
}

export const getOwnedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK).json('getOwnedPosts')
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK).json('updatePost')
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK).json('deletePost')
  } catch (error) {
    next(error)
  }
}

export const interactPost = async (
  req: RequestPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(httpStatus.OK).json('interactpost')
  } catch (error) {
    next(error)
  }
}
