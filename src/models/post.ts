import { Schema, model } from 'mongoose'

import { type IPost } from '../types'
import { postStatus } from '../constants'

const PostSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: true
    },
    ownerId: {
      type: String,
      required: true,
      ref: 'user',
      field: 'id'
    },
    title: {
      type: String,
      required: true,
      default: 'Unknown'
    },
    content: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: [postStatus.PENDING, postStatus.APPROVED, postStatus.CANCELED]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const Post = model<IPost>('post', PostSchema)
