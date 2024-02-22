import { v4 } from 'uuid'

import { UserInteract } from '../models'
import type { IUserInteract } from '../types'
import { omitIsNil } from '../utils'

export const createInteract = async (interact: IUserInteract): Promise<IUserInteract> => {
  const newInteract = new UserInteract({ ...interact, id: v4() })
  return await newInteract.save()
}

export const getInteract = async (filters: any): Promise<IUserInteract | null> => {
  const interact = await UserInteract.findOne(omitIsNil(filters), { _id: 0 })

  return interact === null ? null : interact
}

export const updateInteract = async (filters: any, fields: any): Promise<IUserInteract | null> => {
  return await UserInteract.findOneAndUpdate(omitIsNil(filters), omitIsNil(fields))
}
