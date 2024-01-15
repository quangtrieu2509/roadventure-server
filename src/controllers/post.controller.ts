import { type Request, type Response, type NextFunction } from 'express'
import httpStatus from 'http-status'

import { type RequestPayload } from '../types'

export const createPost = async (
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

export const getPost = async (
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

export const getOwnedPosts = async (
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

export const updatePost = async (
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

export const deletePost = async (
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

export const interactPost = async (
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
