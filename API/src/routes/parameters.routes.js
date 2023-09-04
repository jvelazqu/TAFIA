
import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as parametersCtrl from '../controllers/parameters.controller'

//router.get('/', [authJwt.verifyToken], parametersCtrl.getAllRecords)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], parametersCtrl.createRecord)

router.get('/', parametersCtrl.getAllRecords)
router.get('/:id', parametersCtrl.getRecordById)
router.post('/', parametersCtrl.createRecord)
router.put('/:id', parametersCtrl.updateRecordById)
router.delete('/:id', parametersCtrl.deleteRecordById)
router.put('/del/:id', parametersCtrl.disableRecordById)


export default router;