import { Schema, model } from 'mongoose'

import { type IUserInteract } from '../types'

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
    follow: {
      type: Boolean,
      required: true,
      default: false
    },
    block: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const UserInteract = model<IUserInteract>('userInteract', UserInteractSchema)
