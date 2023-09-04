import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as areasCtrl from '../controllers/areas.controller'

//router.get('/', [authJwt.verifyToken], areasCtrl.getAllAreas)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], areasCtrl.createArea)

router.get('/', areasCtrl.getAllAreas)
router.get('/:id', areasCtrl.getAreaById)
router.post('/', areasCtrl.createArea)
router.put('/:id', areasCtrl.updateAreaById)
router.delete('/:id', areasCtrl.deleteAreaById)
router.put('/del/:id', areasCtrl.disableAreaById)


export default router;