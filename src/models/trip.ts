import { Schema, model } from 'mongoose'

import { type ITrip } from '../types'
import { privacies } from '../constants'

const TripSchema = new Schema(
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
    description: {
      type: String
    },
    privacy: {
      type: String,
      required: true,
      enum: [privacies.PUBLIC, privacies.PRIVATE]
    },
    destinations: {
      type: [
        {
          text: String,
          placeName: String,
          coordinates: [Number, Number],
          description: String
        }
      ]
    },
    date: {
      type: [Date, Date]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const Trip = model<ITrip>('trip', TripSchema)
