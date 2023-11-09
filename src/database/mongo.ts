import mongoose from 'mongoose'

import type { MongoSettings } from '../types'

import { vars, emitter } from '../configs'
import { events, envs } from '../constants'

mongoose.Promise = Promise

mongoose.connection.on('error', (err: Error) => {
  console.log(`[database]-[mongo] error ${err.message}`)
})

const makeMongoURI = (mongoSettings: MongoSettings): string => {
  const { server, username, password, repls, dbName = '' } = mongoSettings
  const hostURL = server.split(' ').join(',')
  const loginOption =
    username != null && password != null ? `${username}:${password}@` : ''
  const replOption = repls != null ? `?replicaSet=${repls}` : ''

  return `mongodb://${loginOption}${hostURL}/${dbName}${replOption}`
}

const connect = (): void => {
  const uri = makeMongoURI(vars.mongo)
  if (vars.env === envs.DEV) {
    mongoose.set('debug', true)
  }
  mongoose
    .connect(uri, {
      dbName: vars.mongo.dbName
    })
    .then(() => {
      emitter.emit(events.MONGO_CONNECTED, uri)
    })
    .catch((err: Error) => {
      console.log(`[database]-[mongo] error ${err.message}`)
    })
}

export = { connect }
