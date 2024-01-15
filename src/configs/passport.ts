import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'

import { vars } from './vars'
// import { accountTypes } from '../constants/account-types'
// import { messages, roles } from '../constants'
// import { userRepo } from '../repositories'
// import type { IUser } from '../types'

passport.serializeUser((user: Express.User, done: any) => {
  console.log('Serialize')
  done(null, user)
})

passport.deserializeUser((id: string, done: any) => {
  console.log('deSerialize')
  done(null, id)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: vars.passport.clientId,
      clientSecret: vars.passport.clientSecret,
      callbackURL: 'http://localhost:3000/api/roadventure/v1/auth/google/callback'
    },
    (_accessToken, _refreshToken, profile, callback) => {
      // const email = profile.emails?.at(0)?.value
      // const user = await userRepo.findUser({ email })

      // // if email do not exist yet
      // if ((email !== undefined) && (user == null)) {
      //   const user = {
      //     givenName: profile.name?.givenName,
      //     familyName: profile.name?.familyName,
      //     email,
      //     accountType: accountTypes.GOOGLE,
      //     role: roles.USER
      //   }
      //   const newUser = await userRepo.createUser(user as unknown as IUser)

      //   callback(null, newUser)
      // // if email exist already
      // } else {
      //   delete user?.password
      //   if (user?.accountType === accountTypes.EMAIL) {
      //     callback(null, messages.CHANGE_ACCOUNT_TYPE)
      //   } else {
      //     callback(null, user as Express.User)
      //   }
      // }
      const user = {
        givenName: profile.name?.givenName,
        familyName: profile.name?.familyName,
        email: profile.emails?.at(0)?.value
      }
      callback(null, user as Express.User)
    }
  )
)

passport.use(
  new LocalStrategy(
    (username, password, done) => {
      // User.findOne({ username: username }, function (err, user) {
      //   if (err) { return done(err); }
      //   if (!user) { return done(null, false); }
      //   if (!user.verifyPassword(password)) { return done(null, false); }
      //   return done(null, user);
      // })
      console.log(username, ' --- ', password)
      done(null, false)
    }
  )
)
