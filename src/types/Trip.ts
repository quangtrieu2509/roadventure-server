export interface ITrip {
  id: string
  ownerId: string
  title: string
  description?: string
  privacy: string
  destinations: Array<{
    text: string
    placeName: string
    coordinates: number[]
    description: string
  }>
  date: Date[]
}
