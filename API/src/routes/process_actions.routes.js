
import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as controller from '../controllers/process_actions.controller'

//router.get('/', [authJwt.verifyToken], usersCtrl.getAllUsers)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], UsersCtrl.createUser)

router.get('/', controller.getAllRecords)
router.get('/:id', controller.getRecordById)
router.post('/', controller.createRecord)
router.put('/:id', controller.updateRecordById)
router.delete('/:id', controller.deleteRecordById)
router.put('/del/:id', controller.disableRecordById)


export default router;