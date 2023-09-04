import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as processesCtrl from '../controllers/processes.controller'

//router.get('/', [authJwt.verifyToken], processesCtrl.getAllProcesses)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], processesCtrl.createProcesse)

router.get('/', processesCtrl.getAllProcesses)
router.get('/:id', processesCtrl.getProcessById)
router.post('/', processesCtrl.createProcess)
router.put('/:id', processesCtrl.updateProcessById)
router.delete('/:id', processesCtrl.deleteProcessById)
router.put('/del/:id', processesCtrl.disableProcessById)
router.get('/job/:id', processesCtrl.getProcessByJob)


export default router;