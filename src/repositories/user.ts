import { v4 } from 'uuid'

import { User } from '../models'
import type { IUser } from '../types'
import { omitIsNil } from '../utils'

const createUser = async (user: IUser): Promise<IUser> => {
  const newUser = new User({ ...user, id: v4() })
  return await newUser.save()
}

// const checkExistedEmail = async (email: string): Promise<boolean> => {
//   const user = await User.findOne({ email })
//   return (user != null)
// }

const findUser = async (filters: any): Promise<IUser | null> => {
  const user = await User.findOne(omitIsNil(filters), { _id: 0 })
  return (user == null) ? user : await user.toObject()
}

const updateUser = async (filters: any, fields: any): Promise<IUser | null> => {
  return await User.findOneAndUpdate(omitIsNil(filters), omitIsNil(fields))
}

export { createUser, findUser, updateUser }
