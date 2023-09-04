import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Errors'

export const getAllErrors = async (req, res) => {
    pool.query('SELECT * FROM v_get_errors', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllErrors", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createError = async (req, res) => {
     console.log(req.body)
  
    var now = + new Date()

    const { usr_name, usr_full_name, usr_email, usr_password, usr_grp_id} = req.body
    var usr_pwd_encrypt = await Errors.encryptPassword(usr_password)
    const values = [usr_name, usr_full_name, usr_email, usr_pwd_encrypt, usr_grp_id, 'On']
    
    
    pool.query('INSERT INTO Errors(usr_name, usr_full_name, usr_email, usr_password, usr_grp_id, usr_status, usr_create_date, usr_update_date) VALUES($1, $2, $3, $4, $5, $6, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createError", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new Error ("+values+") by Error: "+ req.body.Error)//TODO: 
                }
            res.status(200).json({app: moduleName+".createError", message: "Error created"})
        }
    });
    
}

export const getErrorById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_Errors WHERE usr_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getErrorById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getErrorById", message: "Error not exists"})
    }
}

export const getErrorByCode = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_Errors WHERE error_code = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getErrorByCode", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getErrorById", message: "Error not exists"})
    }
}

export const updateErrorById = async (req, res) => {

    console.log(req.body)
    var query = ''
    var values = []

    if(req.body.usr_password){
        var usr_pwd_encrypt = await Errors.encryptPassword(req.body.usr_password)
        values = [ req.params.id, req.body.usr_full_name, req.body.usr_email,usr_pwd_encrypt, req.body.usr_grp_id, req.body.usr_status] 
        query = 'UPDATE Errors SET usr_full_name = $2, usr_email = $3, usr_password = $4, usr_grp_id = $5,usr_status= $6 ,usr_update_date = NOW() WHERE usr_id = $1 '
    }else{
        values = [ req.params.id, req.body.usr_full_name, req.body.usr_email, req.body.usr_grp_id, req.body.usr_status]
        query = 'UPDATE Errors SET usr_full_name = $2, usr_email = $3, usr_grp_id = $4, usr_status= $5 ,usr_update_date = NOW() WHERE usr_id = $1 '
    }  
      
    if(req.params.id){

        
        pool.query(query,values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateErrorById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating Error ("+req.params.id+") by Error: "+ req.body.Error)
                }
                res.status(200).json({app: moduleName+".updateErrorById", message: "Error updated"})
            }
        });
    }

    
}

export const deleteErrorById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM Errors WHERE usr_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteErrorById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting Error ("+req.params.id+") by Error: "+ req.body.Error)
                }
                res.status(200).json({app: moduleName+"deleteErrorById", message: "Error deleted"})
            }
        });
    }
}

export const disableErrorById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE Errors SET usr_status = $2, usr_update_date = NOW() WHERE usr_id = $1', [req.params.id, 'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledErrorById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling Error ("+req.params.id+") by Error: "+ req.body.Error)
                }
                res.status(200).json({app: moduleName+"disableErrorById", message: "Error disabled"})
            }
        });
    }
}

