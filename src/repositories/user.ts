import { v4 } from 'uuid'

import { User } from '../models'
import { type IUser } from '../types'

const createUser = async (user: IUser): Promise<IUser> => {
  const newUser = new User({ ...user, id: v4() })
  return await newUser.save()
}

export { createUser }
