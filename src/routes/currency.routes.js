//import packages
import { Router } from 'express'
import passport from 'passport'

//config
const router = Router()

//controllers
import * as CurrencyController from '../controllers/currency.controller'
import validateRole from '../middlewares/validate-role'

//methods
router.post('/getAllCurrencys', passport.authenticate('jwt', { session: false }), validateRole(['superadmin', 'admin', 'client']), CurrencyController.getAllCurrencys)

export default router