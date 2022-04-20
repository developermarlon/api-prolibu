import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt'
import User from '../database/models/User'

import dotenv from 'dotenv'
if (!process.env.NODE_ENV) dotenv.config()

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload, callback) => {
    try {
        const user = await User.findOne({ _id: jwtPayload.id }).populate('permissions')
        if (user) return callback(null, user)
        return callback(null, false)
    } catch (error) {
        return callback(error)
    }
}
));