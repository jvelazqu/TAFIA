
import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as samplesCtrl from '../controllers/samples.controller'

//router.get('/', [authJwt.verifyToken], samplesCtrl.getAllsamples)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], samplesCtrl.createUser)

router.get('/', samplesCtrl.getAllrecords)
router.get('/:id', samplesCtrl.getRecordById)
router.post('/', samplesCtrl.createRecord)
router.put('/:id', samplesCtrl.updateRecordById)
router.delete('/:id', samplesCtrl.deleteRecordById)



export default router;