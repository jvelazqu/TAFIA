import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as carrier_typesCtrl from '../controllers/carrier_types.controller'

//router.get('/', [authJwt.verifyToken], carrier_typesCtrl.getAllCarrierTypes)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], carrier_typesCtrl.createCarrierType)

router.get('/', carrier_typesCtrl.getAllCarrierTypes)
router.get('/:id', carrier_typesCtrl.getCarrierTypeById)
router.post('/', carrier_typesCtrl.createCarrierType)
router.put('/:id', carrier_typesCtrl.updateCarrierTypeById)
router.delete('/:id', carrier_typesCtrl.deleteCarrierTypeById)
router.put('/del/:id', carrier_typesCtrl.disableCarrierTypeById)


export default router;