import { v4 } from 'uuid'

import { Trip, User } from '../models'
import type { IUser } from '../types'
import { omitIsNil } from '../utils'
import { UserInteract } from '../models/userInteract'

export const createUser = async (user: IUser): Promise<IUser> => {
  const newUser = new User({ ...user, id: v4() })
  return await newUser.save()
}

// const checkExistedEmail = async (email: string): Promise<boolean> => {
//   const user = await User.findOne({ email })
//   return (user != null)
// }

export const getUser = async (filters: any): Promise<IUser | null> => {
  const user = await User.findOne(omitIsNil(filters), { _id: 0 })

  return user === null ? user : await user.toObject()
}

export const getUserProfile = async (filters: any): Promise<IUser | null> => {
  const user = await User.findOne(omitIsNil(filters), { _id: 0 })

  if (user === null) return user

  const tripCount = await Trip.count({ ownerId: user.id })
  const followingCount = await UserInteract.count({ srcUserId: user.id, follow: true })
  const followers = await UserInteract.find({ desUserId: user.id, follow: true }, { srcUserId: 1 })

  const returnedFollowers: string[] = []
  followers.forEach((e) => {
    returnedFollowers.push(e.srcUserId)
  })

  const returnedUser = {
    ...user.toObject(),
    tripCount,
    followingCount,
    followers: returnedFollowers
  }

  return returnedUser
}

export const getUserId = async (filters: any): Promise<string | null> => {
  const user = await User.findOne(omitIsNil(filters), { _id: 0, id: 1 })

  return user === null ? null : user.id
}

export const updateUser = async (filters: any, fields: any): Promise<IUser | null> => {
  return await User.findOneAndUpdate(omitIsNil(filters), omitIsNil(fields))
}
