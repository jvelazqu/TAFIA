import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as productsCtrl from '../controllers/products.controller'

//router.get('/', [authJwt.verifyToken], productsCtrl.getAllProducts)
//router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.createProduct)

router.get('/', productsCtrl.getAllProducts)
router.get('/:id', productsCtrl.getProductById)
router.post('/', productsCtrl.createProduct)
router.put('/:id', productsCtrl.updateProductById)
router.delete('/:id', productsCtrl.deleteProductById)
router.put('/del/:id', productsCtrl.disableProductById)


export default router;