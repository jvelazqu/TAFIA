import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Locations'

export const getAllLocations = async (req, res) => {
    pool.query('SELECT * FROM v_get_locations', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllLocations", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createLocation = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.loc_name, req.body.loc_description, 'On']
    
    pool.query('INSERT INTO locations(loc_name, loc_description, loc_status, loc_create_date, loc_update_date) VALUES($1, $2, $3, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createLocation", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new location ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createLocation", message: "Location created"})
        }
    });
}

export const getLocationById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_locations WHERE loc_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getLocationById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getLocationById", message: "Location not exists"})
    }
}

export const updateLocationById = async (req, res) => {
    
    const values = [ req.params.id, req.body.loc_description, req.body.loc_status]
    
    if(req.params.id){
        pool.query('UPDATE locations SET loc_description = $2, loc_status = $3, loc_update_date = NOW() WHERE loc_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateLocationById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating location ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateLocationById", message: "Location updated"})
            }
        });
    }

    
}

export const deleteLocationById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM locations WHERE loc_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteLocationById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting location ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteLocationById", message: "Location deleted"})
            }
        });
    }
}

export const disableLocationById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE locations SET loc_status = $2, loc_update_date = NOW()  WHERE loc_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledLocationById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling location ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableLocationById", message: "Location disabled"})
            }
        });
    }
}

