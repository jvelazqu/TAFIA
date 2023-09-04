
import {Router} from 'express'
const router = Router()
//import {authJwt} from '../middlewares'
import * as unitsCtrl from '../controllers/units.controller'

//router.get('/', [authJwt.verifyToken], usersCtrl.getAllUsers)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], UsersCtrl.createUser)

//router.get('/', unitsCtrl.getAllUsers)
//router.get('/:id', usersCtrl.getUserById)
router.get('/process/:id', unitsCtrl.getUnitsByProcess)
router.get('/history/:id', unitsCtrl.getUnitHistory)
router.get('/search/', unitsCtrl.getUnitHistoryBySerialNumber)
router.post('/create', unitsCtrl.createUnit)
router.post('/start', unitsCtrl.startUnit)
router.post('/finish', unitsCtrl.finishUnit)
router.post('/process', unitsCtrl.processUnit)
//router.put('/:id', usersCtrl.updateUserById)
//router.delete('/:id', usersCtrl.deleteUserById)
//router.put('/del/:id', usersCtrl.disableUserById)


export default router;