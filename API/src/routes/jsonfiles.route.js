import {Router} from 'express'
const router = Router()

import * as pdfFiles from '../controllers/pdffiles.controller'

router.post('/',pdfFiles.uploadFile);
router.get('/', pdfFiles.getFile);

export default router;