import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { type IUser } from '../types'
import { roles } from '../constants'
import { accountTypes } from '../constants/account-types'

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: true
    },
    givenName: {
      type: String,
      required: true
    },
    familyName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: {
      type: String
    },
    accountType: {
      type: String,
      required: true,
      enum: [accountTypes.GOOGLE, accountTypes.EMAIL]
    },
    phoneNumber: {
      type: Number
    },
    address: {
      type: String
    },
    role: {
      type: String,
      required: true,
      default: roles.USER
    },
    profilePhoto: {
      type: Buffer
    },
    // followers: {
    //   type: [
    //     {
    //       type: String,
    //       ref: 'user',
    //       field: 'id'
    //     }
    //   ],
    //   // type: Array<string>,
    //   default: []
    // },
    // following: {
    //   type: [
    //     {
    //       type: String,
    //       ref: 'user',
    //       field: 'id'
    //     }
    //   ],
    //   // type: Array<string>,
    //   default: []
    // },
    isActivated: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

UserSchema.pre('save', async function (next) {
  if (this.password !== undefined) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

export const User = model<IUser>('user', UserSchema)
