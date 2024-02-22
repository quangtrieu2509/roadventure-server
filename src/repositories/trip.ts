import { v4 } from 'uuid'

import { Trip } from '../models'
import type { ITrip } from '../types'
import { omitIsNil } from '../utils'

export const createTrip = async (trip: ITrip): Promise<ITrip> => {
  const newTrip = new Trip({ ...trip, id: v4() })
  return await newTrip.save()
}

export const getTrips = async (filters: any): Promise<ITrip[]> => {
  const trips = await Trip.find(omitIsNil(filters), { _id: 0 }).sort({ createdAt: -1 })
  const returnedTrips: ITrip[] = []
  trips.forEach((trip) => returnedTrips.push(trip.toObject()))
  return returnedTrips
}

export const findTrip = async (filters: any): Promise<ITrip | null> => {
  const trip = await Trip.findOne(omitIsNil(filters), { _id: 0 })
  return trip === null ? null : await trip.toObject()
}
