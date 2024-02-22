import { Trip, TripInteract, User } from '../models'
import { interactTypes } from '../constants'
import { omitIsNil } from '../utils'
import { type ITripInteract } from '../types'
import { v4 } from 'uuid'

export const createInteract = async (
  interact: ITripInteract
): Promise<ITripInteract> => {
  const newInteract = new TripInteract({ ...interact, id: v4() })
  return await newInteract.save()
}

export const getInteractQuantity = async (tripId: string): Promise<any> => {
  const likes = await TripInteract.count({ tripId, type: interactTypes.LIKE })
  const comments = await TripInteract.count({
    tripId,
    type: interactTypes.COMMENT
  })
  return { likes, comments }
}

export const getComments = async (filters: any): Promise<any> => {
  const comments = await TripInteract.find(omitIsNil(filters), {
    _id: 0,
    id: 1,
    content: 1,
    userId: 1,
    createdAt: 1
  })
  const commentsDto: object[] = []
  for (let comment of comments) {
    comment = comment.toObject()
    const user = await User.findOne(
      { id: comment.userId },
      { _id: 0, id: 1, givenName: 1, familyName: 1, username: 1, picture: 1 }
    )
    commentsDto.push({ ...comment, user })
  }
  return commentsDto
}

export const getSavedTrips = async (userId: string): Promise<any> => {
  const interacts = await TripInteract.find({ userId, type: interactTypes.SAVE }, {
    _id: 0,
    tripId: 1
  }).sort({ createdAt: -1 })
  const interactsDto: object[] = []
  for (const interact of interacts) {
    const trip = await Trip.findOne({ id: interact.tripId }, { _id: 0, privacy: 0, destinations: 0, itinerary: 0 })
    const owner = await User.findOne(
      { id: trip?.ownerId },
      { _id: 0, id: 1, givenName: 1, familyName: 1, username: 1, picture: 1 }
    )
    interactsDto.push({ ...trip?.toObject(), owner })
  }
  return interactsDto
}

export const checkExistedInteract = async (filters: any): Promise<boolean> => {
  const interact = await TripInteract.exists(omitIsNil(filters))
  return interact !== null
}

export const deleteInteract = async (filters: any): Promise<void> => {
  await TripInteract.findOneAndDelete(omitIsNil(filters), { id: 1, _id: 0 })
}
