
import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as usersCtrl from '../controllers/users.controller'

//router.get('/', [authJwt.verifyToken], usersCtrl.getAllUsers)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], UsersCtrl.createUser)

router.get('/', usersCtrl.getAllUsers)
router.get('/:id', usersCtrl.getUserById)
router.post('/', usersCtrl.createUser)
router.put('/:id', usersCtrl.updateUserById)
router.delete('/:id', usersCtrl.deleteUserById)
router.put('/del/:id', usersCtrl.disableUserById)


export default router;