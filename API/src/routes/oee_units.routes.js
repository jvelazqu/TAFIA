import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as oeeUnitsCtrl from '../controllers/oee_units.controller'

//router.get('/', [authJwt.verifyToken], productsCtrl.getAllProducts)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.createProduct)

router.post('/register_piece', oeeUnitsCtrl.register_piece)


export default router;