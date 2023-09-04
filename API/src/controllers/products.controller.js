import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Products'

export const getAllProducts = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_products', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllProducts", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createProduct = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.prd_name, req.body.prd_description, req.body.prd_pty_id, 'On']
    
    pool.query('INSERT INTO products(prd_name, prd_description, prd_pty_id, prd_status, prd_create_date, prd_update_date) VALUES($1, $2, $3, $4, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createProduct", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new product ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createProduct", message: "Product created"})
        }
    });
}

export const getProductById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_products WHERE prd_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getProductById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getProductById", message: "Product not exists"})
    }
}

export const updateProductById = async (req, res) => {
    
    const values = [ req.params.id, req.body.prd_description, req.body.prd_status, req.body.prd_pty_id]
    
    if(req.params.id){
        pool.query('UPDATE products SET prd_description = $2, prd_status = $3, prd_pty_id= $4, prd_update_date = NOW() WHERE prd_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateProductById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating product ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateProductById", message: "Product updated"})
            }
        });
    }

    
}

export const deleteProductById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM products WHERE prd_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteProductById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting product ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteProductById", message: "Product deleted"})
            }
        });
    }
}

export const disableProductById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE products SET prd_status = $2, prd_update_date = NOW()  WHERE prd_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledProductById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling product ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableProductById", message: "Product disabled"})
            }
        });
    }
}

