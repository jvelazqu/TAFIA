import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as product_typesCtrl from '../controllers/product_types.controller'

//router.get('/', [authJwt.verifyToken], product_typesCtrl.getAllProductTypes)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], product_typesCtrl.createProductType)

router.get('/', product_typesCtrl.getAllProductTypes)
router.get('/:id', product_typesCtrl.getProductTypeById)
router.post('/', product_typesCtrl.createProductType)
router.put('/:id', product_typesCtrl.updateProductTypeById)
router.delete('/:id', product_typesCtrl.deleteProductTypeById)
router.put('/del/:id', product_typesCtrl.disableProductTypeById)


export default router;