import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../database/models/User'

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, callback) => {
    try {
        email = email.toLowerCase()
        const user = await User.findOne({ email: email.toLowerCase() }).populate({ path: 'permissions', select: { '_id': 0 } })

        if (user) {
            if (!await User.comparePassword(password, user.password)) return callback(null, false, { message: 'Incorrect email or password.' })
            return callback(null, user, { message: 'Logged In Successfully' })
        } else {
            return callback(null, false, { message: 'Incorrect email or password.' })
        }
    } catch (error) {
        console.log(error)
        callback(error)
    }
}
))