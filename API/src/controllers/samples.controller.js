import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Samples'

export const getAllrecords = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_samples', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllrecords", message: "Internal database error ("+dbError.code+")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createRecord = async (req, res) => {
    
    var query = `INSERT INTO public.samples(spl_serial_number, spl_uty_id, spl_prc_id, spl_prd_id, spl_status, spl_create_date, spl_expiration_date)`+
	              `VALUES ('${req.body.spl_serial_number}', '${req.body.spl_uty_id}', ${req.body.spl_prc_id}, ${req.body.spl_prd_id}, '${req.body.spl_status}', NOW(), '${req.body.spl_expiration_date}')`
    console.log(`VALUES ('${req.body.spl_serial_number}', '${req.body.spl_uty_id}', ${req.body.spl_prc_id}, ${req.body.spl_prd_id}, '${req.body.spl_status}', NOW(), '${req.body.spl_expiration_date}')`)
    pool.query(query,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            //console.log(dbError)
            res.status(500).json({app: moduleName+".createRecord", message: "Internal database error ("+dbError.code+")"})                
        }else{
            if(config.AUDIT){
                logger.info("Creating new sample ("+req.body.spl_serial_number+") by User: "+ req.body.user)
            }           
            res.status(200).json({app: moduleName+".createRecord", message: "Record created"})
        }
    });  
}

export const getRecordById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_all_samples WHERE spl_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getRecordById", message: "Internal database error ("+dbError.code+")"})
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getRecordById", message: "Sample not exists"})
    }
}

export const updateRecordById = async (req, res) => {

    console.log(req.body)
    var query = ''
    var values = []

//spl_serial_number, spl_uty_id, spl_prc_id, spl_prd_id, spl_status, spl_create_date, spl_expiration_date
    values = [ req.params.id, req.body.spl_serial_number, req.body.spl_uty_id, spl_prc_id, req.body.spl_prd_id, req.body.spl_status, spl_expiration_date] 
    query = 'UPDATE samples SET spl_serial_number = $2, spl_uty_id = $3, spl_prc_id = $4, spl_prd_id = $5, spl_status= $6 ,spl_expiration_date = $7 WHERE usr_id = $1 '
    
    if(req.params.id){
        
        pool.query(query,values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateRecordById", message: "Internal database error ("+dbError.code+")"})
            }else{
                if(config.AUDIT){
                    logger.info("Updating user ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateRecordById", message: "Sample updated"})
            }
        });
    }

    
}

export const deleteRecordById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM users WHERE usr_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteUserById", message: "Internal database error ("+dbError.code+")"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting user ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteUserById", message: "User deleted"})
            }
        });
    }
}

export const disableRecordById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE users SET usr_status = $2, usr_update_date = NOW() WHERE usr_id = $1', [req.params.id, 'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledUserById", message: "Internal database error ("+dbError.code+")"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling user ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableUserById", message: "User disabled"})
            }
        });
    }
}

export const getTestplanRelease = async (req, res) => {

    if(req.params.id){
        pool.query('SELECT * FROM v_get_testplan_releases WHERE tpr_tes_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".getTestplanRelease", message: "Internal database error ("+dbError.code+")"})
            }else{                
                 res.status(200).json(results.rows)
            }
        });
    }
}

export const addTestrun = async (req, res) => {

    console.log(req.body)
    res.status(200).json({app: moduleName+"addTestrun", message: "Testrun added"})

}