export interface IUser {
  id: string
  givenName: string
  familyName: string
  username: string
  email: string
  password?: string
  phoneNumber: string
  accountType: string
  address: string
  // followers: string[]
  // following: string[]
  role: string
  profilePhoto?: Buffer
  isActivated: boolean
}
