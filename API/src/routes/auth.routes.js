import {Router} from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controller'
import {verifySignup} from '../middlewares'
import {authJwt} from '../middlewares'

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

router.post('/signin',authCtrl.signIn)
//router.post('/signup', verifySignup.checkDuplicate, authCtrl.signUp)
router.get('/admin/:userId',[authJwt.verifyToken, authJwt.isAdmin], authCtrl.isAdmin)
router.get('/supervisor/:userId',[authJwt.verifyToken,authJwt.isSupervisor], authCtrl.isSupervisor)
router.get('/operator/:userId',[authJwt.verifyToken, authJwt.isOperator], authCtrl.isOperator)
router.get('/anybody/:userId',[authJwt.verifyToken], authCtrl.isAnybody)


export default router;