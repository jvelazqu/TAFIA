import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as equipmentsCtrl from '../controllers/equipments.controller'

//router.get('/', [authJwt.verifyToken], equipmentsCtrl.getAllEquipments)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], equipmentsCtrl.createEquipment)

router.get('/', equipmentsCtrl.getAllEquipments)
router.get('/:id', equipmentsCtrl.getEquipmentById)
router.post('/', equipmentsCtrl.createEquipment)
router.put('/:id', equipmentsCtrl.updateEquipmentById)
router.delete('/:id', equipmentsCtrl.deleteEquipmentById)
router.put('/del/:id', equipmentsCtrl.disableEquipmentById)


export default router;