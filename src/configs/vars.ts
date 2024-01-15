import dotenv from 'dotenv'

import { envs } from '../constants'

dotenv.config()

const env = process.env.NODE_ENV ?? envs.DEV

export const vars = {
  port: process.env.PORT ?? 3000,
  socketPort: process.env.SOCKET_PORT ?? 3001,
  env,
  mongo: {
    servers: process.env.MONGO_SERVERS ?? '127.0.0.1:27017',
    dbName:
      env === envs.TEST
        ? process.env.MONGO_DB_NAME_TEST ?? 'db-test'
        : process.env.MONGO_DB_NAME ?? 'roadventure-db',
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    repls: process.env.MONGO_REPLS
  },
  passport: {
    clientId: process.env.PASSPORT_CLIENT_ID as string,
    clientSecret: process.env.PASSPORT_CLIENT_SECRET as string
  }
}

export const accessTokenSettings = {
  secret: process.env.ACCESS_TOKEN_SECRET ?? 'secret_1',
  expireTime: Number(process.env.TOKEN_EXPIRE_TIME) ?? '1d' // day
}
