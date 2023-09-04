import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as locationsCtrl from '../controllers/locations.controller'

//router.get('/', [authJwt.verifyToken], locationsCtrl.getAllLocations)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], locationsCtrl.createLocation)

router.get('/', locationsCtrl.getAllLocations)
router.get('/:id', locationsCtrl.getLocationById)
router.post('/', locationsCtrl.createLocation)
router.put('/:id', locationsCtrl.updateLocationById)
router.delete('/:id', locationsCtrl.deleteLocationById)
router.put('/del/:id', locationsCtrl.disableLocationById)


export default router;