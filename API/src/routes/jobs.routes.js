import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as jobsCtrl from '../controllers/jobs.controller'

//router.get('/', [authJwt.verifyToken], jobsCtrl.getAllJobs)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], jobsCtrl.createJob)

router.get('/', jobsCtrl.getAllJobs)
router.get('/:id', jobsCtrl.getJobById)
router.post('/', jobsCtrl.createJob)
router.put('/:id', jobsCtrl.updateJobById)
router.delete('/:id', jobsCtrl.deleteJobById)
router.put('/del/:id', jobsCtrl.disableJobById)
router.post('/complete/', jobsCtrl.createCompleteJob)
router.put('/finish/:id', jobsCtrl.finishJobById)


export default router;