
import {Router} from 'express'
const router = Router()
import * as errorsCtrl from '../controllers/errors.controller'

//router.get('/', [authJwt.verifyToken], usersCtrl.getAllUsers)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], UsersCtrl.createUser)

router.get('/', errorsCtrl.getAllErrors)
router.get('/:id', errorsCtrl.getErrorByCode)


export default router;