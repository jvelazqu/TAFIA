import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Processes'

export const getAllProcesses = async (req, res) => {
    pool.query('SELECT * FROM v_get_processes', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllProcesses", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createProcess = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.prc_name, req.body.prc_description, req.body.prc_job_id, req.body.prc_step, req.body.prc_eqp_id,'On']
    
    pool.query('INSERT INTO processes(prc_name, prc_description, prc_job_id, prc_step, prc_eqp_id, prc_status, prc_create_date, prc_update_date) VALUES($1, $2, $3, $4, $5, $6, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createProcess", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new process ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createProcess", message: "Process created"})
        }
    });
}

export const getProcessById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_processes WHERE prc_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getProcessById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getProcessById", message: "Process not exists"})
    }
}

export const updateProcessById = async (req, res) => {
    
    const values = [ req.params.id, req.body.prc_description, req.body.prc_status, req.body.prc_job_id, req.body.prc_step, req.body.prc_eqp_id]
    
    if(req.params.id){
        pool.query('UPDATE processes SET prc_description = $2, prc_status = $3, prc_job_id= $4, prc_step=$5, prc_eqp_id=$6, prc_update_date = NOW() WHERE prc_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateProcessById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating process ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateProcessById", message: "Process updated"})
            }
        });
    }

    
}

export const deleteProcessById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM processes WHERE prc_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteProcessById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting process ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteProcessById", message: "Process deleted"})
            }
        });
    }
}

export const disableProcessById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE processes SET prc_status = $2, prc_update_date = NOW()  WHERE prc_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledProcessById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling process ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableProcessById", message: "Process disabled"})
            }
        });
    }
}

export const getProcessByJob = async (req, res) => {

    if(req.params.id){
        pool.query('SELECT * FROM v_get_process_by_job  WHERE prc_job_id = $1 ORDER BY prc_step', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".getProcessByJob", message: "Internal database error"})
            }else{
                res.status(200).json(results.rows)
            }
        });
    }
}
