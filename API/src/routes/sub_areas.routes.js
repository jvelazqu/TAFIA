import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as sub_areasCtrl from '../controllers/sub_areas.controller'

//router.get('/', [authJwt.verifyToken], sub_areasCtrl.getAllSubAreas)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], sub_areasCtrl.createSubArea)

router.get('/', sub_areasCtrl.getAllSubAreas)
router.get('/:id', sub_areasCtrl.getSubAreaById)
router.post('/', sub_areasCtrl.createSubArea)
router.put('/:id', sub_areasCtrl.updateSubAreaById)
router.delete('/:id', sub_areasCtrl.deleteSubAreaById)
router.put('/del/:id', sub_areasCtrl.disableSubAreaById)


export default router;