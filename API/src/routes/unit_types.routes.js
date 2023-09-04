import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as unit_typesCtrl from '../controllers/unit_types.controller'

//router.get('/', [authJwt.verifyToken], unit_typesCtrl.getAllUnitTypes)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], unit_typesCtrl.createUnitType)

router.get('/', unit_typesCtrl.getAllUnitTypes)
router.get('/:id', unit_typesCtrl.getUnitTypeById)
router.post('/', unit_typesCtrl.createUnitType)
router.put('/:id', unit_typesCtrl.updateUnitTypeById)
router.delete('/:id', unit_typesCtrl.deleteUnitTypeById)
router.put('/del/:id', unit_typesCtrl.disableUnitTypeById)


export default router;