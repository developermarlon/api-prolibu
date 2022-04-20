import User from '../database/models/User'
import UserPermission from '../database/models/UserPermission'
import passport from 'passport'
import jwt from 'jsonwebtoken'
// import { v4 as uuidv4 } from 'uuid'
import geoip from 'geoip-lite'
import moment from 'moment-timezone'
import dotenv from 'dotenv'
import pick from 'object.pick'

moment().tz('America/Bogota').locale('es')
if (process.env.NODE_ENV === 'development') dotenv.config({ path: '.env.development' })

// let newRoom = await uuidv4()

export const verifyToken = async (req, res) => {
    res.status(200).json({ message: 'token verified' })
}

export const login = async (req, res) => {
    console.log('llega a este punto')
    try {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                console.log(err)
                return res.status(400).json({
                    message: 'Usuario o contraseña incorrectos',
                    user: user
                });
            }
            req.login(user, { session: false }, async (err) => {
                if (err) {
                    res.status(400).send(err);
                }

                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "5d" });

                return res.status(200).json({ ...pick(user, ['email', 'fullname', 'permissions']), token: `Bearer ${token}` });

            })
        })(req, res)
    } catch (error) {
        console.log(error)
    }
}


export const register = async (req, res) => {
    try {
        let { fullname, email, password } = req.body

        const rolesFound = await UserPermission.find({ name: { $in: ['client'] } })
        const userFound = await User.findOne({ email: email.toLowerCase() })

        const ip = (req.header('x-forwarded-for') || req.connection.remoteAddress).split(',')[0];

        const geo = await geoip.lookup(ip)

        if (userFound) return res.status(400).json({ message: 'El usuario ya se encuentra registrado' })

        const user = new User({
            fullname,
            email: email.toLowerCase(),
            ip,
            geo,
            password,
            permissions: rolesFound.map((role) => role._id)
        })

        user.password = await User.encryptPassword(user.password);

        await user.save();

        res.status(200).json({ message: 'Usuario creado satisfactoriamente' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'El usuario ya se encuentra registrado' })
    }
}

export const editProfile = async (req, res) => {
    try {
        const { fullname, email, photo } = req.body
        await User.updateOne({ _id: req.user._id }, { fullname, email, photo })
        res.status(200).json({ message: 'Usuario actualizado correctamente' })
    } catch (error) {
        res.status(400).json({ message: 'Lo sentimos, el usuario no pudo ser actualizado' })
    }
}