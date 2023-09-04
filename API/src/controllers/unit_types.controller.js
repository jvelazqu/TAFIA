import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'UnitTypes'

export const getAllUnitTypes = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_unit_types', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllUnitTypes", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createUnitType = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.uty_name, req.body.uty_description, 'On']
    
    pool.query('INSERT INTO unit_types(uty_name, uty_description, uty_status, uty_create_date, uty_update_date) VALUES($1, $2, $3, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createUnitType", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new Unit type ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createUnitType", message: "UnitType created"})
        }
    });
}

export const getUnitTypeById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_Unit_types WHERE uty_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getUnitTypeById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getUnitTypeById", message: "UnitType not exists"})
    }
}

export const updateUnitTypeById = async (req, res) => {
    
    const values = [ req.params.id, req.body.uty_description, req.body.uty_status]
    
    if(req.params.id){
        pool.query('UPDATE Unit_types SET uty_description = $2, uty_status = $3, uty_update_date = NOW() WHERE uty_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateUnitTypeById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating Unit type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateUnitTypeById", message: "UnitType updated"})
            }
        });
    }

    
}

export const deleteUnitTypeById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM Unit_types WHERE uty_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteUnitTypeById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting Unit type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteUnitTypeById", message: "UnitType deleted"})
            }
        });
    }
}

export const disableUnitTypeById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE Unit_types SET uty_status = $2, uty_update_date = NOW()  WHERE uty_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledUnitTypeById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling Unit type ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableUnitTypeById", message: "UnitType disabled"})
            }
        });
    }
}

