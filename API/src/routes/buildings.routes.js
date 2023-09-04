import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as buildingsCtrl from '../controllers/buildings.controller'

//router.get('/', [authJwt.verifyToken], buildingsCtrl.getAllBuildings)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], buildingsCtrl.createBuilding)

router.get('/', buildingsCtrl.getAllBuildings)
router.get('/:id', buildingsCtrl.getBuildingById)
router.post('/', buildingsCtrl.createBuilding)
router.put('/:id', buildingsCtrl.updateBuildingById)
router.delete('/:id', buildingsCtrl.deleteBuildingById)
router.put('/del/:id', buildingsCtrl.disableBuildingById)


export default router;