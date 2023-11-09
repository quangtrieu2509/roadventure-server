import { Schema, model } from 'mongoose'

import { type IUser } from '../types'

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    versionKey: false
  }
)

export const User = model<IUser>('user', UserSchema)
