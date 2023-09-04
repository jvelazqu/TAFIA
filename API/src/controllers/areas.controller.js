import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Areas'

export const getAllAreas = async (req, res) => {
    pool.query('SELECT * FROM v_get_areas', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllAreas", message: "Internal database error"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createArea = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.are_name, req.body.are_description, req.body.are_bld_id, 'On']
    
    pool.query('INSERT INTO areas(are_name, are_description, are_bld_id, are_status, are_create_date, are_update_date) VALUES($1, $2, $3, $4, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createArea", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new area ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createArea", message: "Area created"})
        }
    });
}

export const getAreaById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_areas WHERE are_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getAreaById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getAreaById", message: "Area not exists"})
    }
}

export const updateAreaById = async (req, res) => {
    
    const values = [ req.params.id, req.body.are_description, req.body.are_status, req.body.are_bld_id]
    
    if(req.params.id){
        pool.query('UPDATE areas SET are_description = $2, are_status = $3, are_bld_id= $4, are_update_date = NOW() WHERE are_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateAreaById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating area ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateAreaById", message: "Area updated"})
            }
        });
    }

    
}

export const deleteAreaById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM areas WHERE are_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteAreaById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting area ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteAreaById", message: "Area deleted"})
            }
        });
    }
}

export const disableAreaById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE areas SET are_status = $2, are_update_date = NOW()  WHERE are_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledAreaById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling area ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableAreaById", message: "Area disabled"})
            }
        });
    }
}

