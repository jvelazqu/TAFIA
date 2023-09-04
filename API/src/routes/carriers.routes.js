import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as carriersCtrl from '../controllers/carriers.controller'

//router.get('/', [authJwt.verifyToken], carriersCtrl.getAllCarriers)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], carriersCtrl.createCarrier)

router.get('/', carriersCtrl.getAllCarriers)
router.get('/:id', carriersCtrl.getCarrierById)
router.post('/', carriersCtrl.createCarrier)
router.put('/:id', carriersCtrl.updateCarrierById)
router.delete('/:id', carriersCtrl.deleteCarrierById)
router.put('/del/:id', carriersCtrl.disableCarrierById)


export default router;