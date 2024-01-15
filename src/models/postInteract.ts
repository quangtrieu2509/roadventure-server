import { Schema, model } from 'mongoose'

import { type IPostInteract } from '../types'
import { interactTypes } from '../constants'

const PostInteractSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: true
    },
    userId: {
      type: String,
      required: true,
      ref: 'user',
      field: 'id'
    },
    PostId: {
      type: String,
      required: true,
      ref: 'user',
      field: 'id'
    },
    type: {
      type: String,
      required: true,
      enum: [interactTypes.COMMENT, interactTypes.LIKE, interactTypes.SAVE]
    },
    content: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const PostInteract = model<IPostInteract>('postInteract', PostInteractSchema)
