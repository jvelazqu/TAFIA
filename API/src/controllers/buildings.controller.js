import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Buildings'

export const getAllBuildings = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_buildings', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllBuildings", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createBuilding = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.bld_name, req.body.bld_description, req.body.bld_loc_id, 'On']
    
    pool.query('INSERT INTO buildings(bld_name, bld_description, bld_loc_id, bld_status, bld_create_date, bld_update_date) VALUES($1, $2, $3, $4, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createBuilding", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new building ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createBuilding", message: "Building created"})
        }
    });
}

export const getBuildingById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_buildings WHERE bld_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getBuildingById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getBuildingById", message: "Building not exists"})
    }
}

export const updateBuildingById = async (req, res) => {
    
    const values = [ req.params.id, req.body.bld_description, req.body.bld_status, req.body.bld_loc_id]
    
    if(req.params.id){
        pool.query('UPDATE buildings SET bld_description = $2, bld_status = $3, bld_loc_id= $4, bld_update_date = NOW() WHERE bld_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateBuildingById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating building ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateBuildingById", message: "Building updated"})
            }
        });
    }

    
}

export const deleteBuildingById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM buildings WHERE bld_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteBuildingById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting building ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteBuildingById", message: "Building deleted"})
            }
        });
    }
}

export const disableBuildingById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE buildings SET bld_status = $2, bld_update_date = NOW()  WHERE bld_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledBuildingById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling building ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableBuildingById", message: "Building disabled"})
            }
        });
    }
}

