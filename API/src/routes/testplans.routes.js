
import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as testplansCtrl from '../controllers/testplans.controller'

//router.get('/', [authJwt.verifyToken], testplansCtrl.getAlltestplans)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], testplansCtrl.createUser)

router.get('/', testplansCtrl.getAllrecords)
router.get('/:id', testplansCtrl.getRecordById)
router.post('/', testplansCtrl.createRecord)
router.put('/:id', testplansCtrl.updateRecordById)
router.delete('/:id', testplansCtrl.deleteRecordById)
router.put('/disable/:id', testplansCtrl.disableRecordById)
router.get('/release/:id', testplansCtrl.getTestplanRelease)
router.post('/testrun', testplansCtrl.addTestrun)


export default router;