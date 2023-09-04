import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'CarrierTypes'

export const getAllCarrierTypes = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_carrier_types', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllCarrierTypes", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createCarrierType = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.cty_name, req.body.cty_description, 'On']
    
    pool.query('INSERT INTO carrier_types(cty_name, cty_description, cty_status, cty_create_date, cty_update_date) VALUES($1, $2, $3, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createCarrierType", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new carrier_type ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createCarrierType", message: "CarrierType created"})
        }
    });
}

export const getCarrierTypeById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_carrier_types WHERE cty_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getCarrierTypeById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getCarrierTypeById", message: "CarrierType not exists"})
    }
}

export const updateCarrierTypeById = async (req, res) => {
    
    const values = [ req.params.id, req.body.cty_description, req.body.cty_status]
    
    if(req.params.id){
        pool.query('UPDATE carrier_types SET cty_description = $2, cty_status = $3, cty_update_date = NOW() WHERE cty_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateCarrierTypeById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating carrier_type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateCarrierTypeById", message: "CarrierType updated"})
            }
        });
    }

    
}

export const deleteCarrierTypeById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM carrier_types WHERE cty_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteCarrierTypeById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting carrier_type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteCarrierTypeById", message: "CarrierType deleted"})
            }
        });
    }
}

export const disableCarrierTypeById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE carrier_types SET cty_status = $2, cty_update_date = NOW()  WHERE cty_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledCarrierTypeById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling carrier_type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableCarrierTypeById", message: "CarrierType disabled"})
            }
        });
    }
}

