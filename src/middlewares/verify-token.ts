import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { type IncomingHttpHeaders } from 'http'
import httpStatus from 'http-status'
import { type Response } from 'express'

import { accessTokenSettings } from '../configs'
import { type RequestPayload } from '../types'
import { getApiResponse } from '../utils'
import { messages } from '../constants'

const getToken = (headers: IncomingHttpHeaders): string => {
  const { authorization } = headers
  if (authorization == null) {
    throw new Error('Invalid header')
  }
  const [tokenType, token] = authorization.split(' ')
  if (tokenType !== 'Bearer' || token === undefined || token === '') {
    throw new Error('Invalid header')
  }
  return token
}

export const verifyToken = (
  req: RequestPayload,
  res: Response,
  next: any
) => {
  try {
    const token = getToken(req.headers)
    const payload = jwt.verify(token, accessTokenSettings.secret)
    req.payload = payload
    console.log('[verify-token]', payload)
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json(getApiResponse(messages.ACCESS_TOKEN_EXPIRED))
    }
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json(getApiResponse(messages.ACCESS_TOKEN_INVALID))
  }
}
