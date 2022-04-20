//import packages
import { Router } from 'express'
import passport from 'passport'

//config
const router = Router()

//controllers
import * as ProductController from '../controllers/product.controller'
import validateRole from '../middlewares/validate-role'

//methods
router.post('/filterProducts', passport.authenticate('jwt', { session: false }), validateRole(['superadmin', 'client']), ProductController.filterProducts)

export default router