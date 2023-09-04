import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Carriers'

export const getAllCarriers = async (req, res) => {
    pool.query('SELECT * FROM v_get_carriers', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllCarriers", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createCarrier = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.car_name, req.body.car_description, req.body.car_cty_id, 'On', req.body.car_max_positions]
    
    pool.query('INSERT INTO carriers(car_name, car_description, car_cty_id, car_status, car_max_positions, car_create_date, car_update_date) VALUES($1, $2, $3, $4, $5, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createCarrier", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new carrier ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createCarrier", message: "Carrier created"})
        }
    });
}

export const getCarrierById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_carriers WHERE car_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getCarrierById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getCarrierById", message: "Carrier not exists"})
    }
}

export const updateCarrierById = async (req, res) => {
    
    const values = [ req.params.id, req.body.car_description, req.body.car_status, req.body.car_cty_id, req.body.car_max_positions]
    
    if(req.params.id){
        pool.query('UPDATE carriers SET car_description = $2, car_status = $3, car_cty_id= $4, car_max_positions = $5, car_update_date = NOW() WHERE car_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateCarrierById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating carrier ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateCarrierById", message: "Carrier updated"})
            }
        });
    }

    
}

export const deleteCarrierById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM carriers WHERE car_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteCarrierById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting carrier ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteCarrierById", message: "Carrier deleted"})
            }
        });
    }
}

export const disableCarrierById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE carriers SET car_status = $2, car_update_date = NOW()  WHERE car_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledCarrierById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling carrier ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableCarrierById", message: "Carrier disabled"})
            }
        });
    }
}

