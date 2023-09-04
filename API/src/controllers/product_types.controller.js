import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'ProductTypes'

export const getAllProductTypes = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_product_types', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllProductTypes", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createProductType = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.pty_name, req.body.pty_description, 'On']
    
    pool.query('INSERT INTO product_types(pty_name, pty_description, pty_status, pty_create_date, pty_update_date) VALUES($1, $2, $3, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createProductType", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new product type ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createProductType", message: "ProductType created"})
        }
    });
}

export const getProductTypeById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_product_types WHERE pty_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getProductTypeById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getProductTypeById", message: "ProductType not exists"})
    }
}

export const updateProductTypeById = async (req, res) => {
    
    const values = [ req.params.id, req.body.pty_description, req.body.pty_status]
    
    if(req.params.id){
        pool.query('UPDATE product_types SET pty_description = $2, pty_status = $3, pty_update_date = NOW() WHERE pty_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateProductTypeById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating product type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateProductTypeById", message: "ProductType updated"})
            }
        });
    }

    
}

export const deleteProductTypeById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM product_types WHERE pty_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteProductTypeById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting product type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteProductTypeById", message: "ProductType deleted"})
            }
        });
    }
}

export const disableProductTypeById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE product_types SET pty_status = $2, pty_update_date = NOW()  WHERE pty_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledProductTypeById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling product type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableProductTypeById", message: "ProductType disabled"})
            }
        });
    }
}

