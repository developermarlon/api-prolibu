//import packages
import { Router } from 'express'
import passport from 'passport'

//config
const router = Router()

//controllers
import * as UserController from '../controllers/user.controller'
import validateRole from '../middlewares/validate-role'

//methods
// router.post('/', passport.authenticate('jwt', {session: false}), validateRole(['superadmin', 'admin', 'client']), UserController.getUsers)
router.post('/verifyToken', passport.authenticate('jwt', {session: false}), UserController.verifyToken)
router.post('/login', UserController.login)
router.post('/register', UserController.register)

export default router