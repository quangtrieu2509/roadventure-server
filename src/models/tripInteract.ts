import { Schema, model } from 'mongoose'

import { type ITripInteract } from '../types'
import { interactTypes } from '../constants'

const TripInteractSchema = new Schema(
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
    tripId: {
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

export const TripInteract = model<ITripInteract>('tripInteract', TripInteractSchema)
