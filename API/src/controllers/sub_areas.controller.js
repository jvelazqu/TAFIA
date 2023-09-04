import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'SubAreas'

export const getAllSubAreas = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_sub_areas', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllSubAreas", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createSubArea = async (req, res) => {

    console.log(req.body)
    
    var now = +new Date()

    const values = [ req.body.sua_name, req.body.sua_description, req.body.sua_are_id, 'On']
    
    pool.query('INSERT INTO sub_areas(sua_name, sua_description, sua_are_id, sua_status, sua_create_date, sua_update_date) VALUES($1, $2, $3, $4, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createSubArea", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new sub_area ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createSubArea", message: "SubArea created"})
        }
    });
}

export const getSubAreaById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_sub_areas WHERE sua_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getSubAreaById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getSubAreaById", message: "SubArea not exists"})
    }
}

export const updateSubAreaById = async (req, res) => {
    
    const values = [ req.params.id, req.body.sua_description, req.body.sua_status, req.body.sua_are_id]
    
    if(req.params.id){
        pool.query('UPDATE sub_areas SET sua_description = $2, sua_status = $3, sua_are_id= $4, sua_update_date = NOW() WHERE sua_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateSubAreaById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating sub_area ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateSubAreaById", message: "SubArea updated"})
            }
        });
    }

    
}

export const deleteSubAreaById = async (req, res) => {
    console.log(req.body)
    if(req.params.id){
        pool.query('DELETE FROM sub_areas WHERE sua_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteSubAreaById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting sub_area ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteSubAreaById", message: "SubArea deleted"})
            }
        });
    }
}

export const disableSubAreaById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE sub_areas SET sua_status = $2, sua_update_date = NOW()  WHERE sua_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledSubAreaById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling sub_area ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableSubAreaById", message: "SubArea disabled"})
            }
        });
    }
}

