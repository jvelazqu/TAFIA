import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as groupsCtrl from '../controllers/groups.controller'

//router.get('/', [authJwt.verifyToken], groupsCtrl.getAllGroups)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], groupsCtrl.createGroup)

router.get('/', groupsCtrl.getAllGroups)
router.get('/:id', groupsCtrl.getGroupById)
router.post('/', groupsCtrl.createGroup)
router.put('/:id', groupsCtrl.updateGroupById)
router.delete('/:id', groupsCtrl.deleteGroupById)
router.put('/del/:id', groupsCtrl.disableGroupById)


export default router;