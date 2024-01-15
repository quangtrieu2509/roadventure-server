import { Schema, model } from 'mongoose'

import { type IUserInteract } from '../types'
import { userInteractTypes } from '../constants'

const UserInteractSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: true
    },
    srcUserId: {
      type: String,
      required: true,
      ref: 'user',
      field: 'id'
    },
    desUserId: {
      type: String,
      required: true,
      ref: 'user',
      field: 'id'
    },
    type: {
      type: String,
      required: true,
      enum: [userInteractTypes.FOLLOW, userInteractTypes.BLOCK]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const UserInteract = model<IUserInteract>('userInteract', UserInteractSchema)
