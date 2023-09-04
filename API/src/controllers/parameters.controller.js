import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Parameters'

export const getAllRecords = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_system_parameters', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllRecords", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createRecord = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.syp_name, req.body.syp_description, req.body.syp_value, 'On']
    
    pool.query('INSERT INTO system_parameters(syp_name, syp_description, syp_value, syp_status, syp_create_date, syp_update_date) VALUES($1, $2, $3, $4, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createRecord", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new record ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createRecord", message: "Record created"})
        }
    });
}

export const getRecordById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_system_parameters WHERE syp_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getRecordById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getRecordById", message: "Record not exists"})
    }
}

export const updateRecordById = async (req, res) => {
    
    const values = [ req.params.id, req.body.syp_description, req.body.syp_value, req.body.syp_status]
    
    if(req.params.id){
        pool.query('UPDATE system_parameters SET syp_description = $2, syp_value = $3, syp_status = $4, syp_update_date = NOW() WHERE syp_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateRecordById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating record ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateRecordById", message: "Record updated"})
            }
        });
    }

    
}

export const deleteRecordById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM system_parameters WHERE syp_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteRecordById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting record ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteRecordById", message: "Record deleted"})
            }
        });
    }
}

export const disableRecordById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE system_parameters SET syp_status = $2, syp_update_date = NOW()  WHERE syp_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledRecordById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling record ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableRecordById", message: "Record disabled"})
            }
        });
    }
}

