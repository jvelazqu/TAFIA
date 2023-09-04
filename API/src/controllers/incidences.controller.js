import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'


const moduleName = 'Incidences'

export const getAllRecords = async (req, res) => {
    pool.query('SELECT * FROM v_get_incidences', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllUsers", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createRecord = async (req, res) => {
    console.log(req.body)
  
    var now = + new Date()

    const {
        inc_identificator,
        inc_class,
        inc_area,
        inc_non_conformity_description,
        inc_iatf_clause,
        inc_root_cause_due_date,
        inc_corrective_action_date,
        inc_action_description,
        inc_action_type,
        inc_usr_id,
        inc_due_date,
        inc_status,
        inc_qms_comments,
        inc_create_date,
        inc_update_date
    } = req.body

    const values = [
        inc_identificator,
        inc_class,
        inc_area,
        inc_non_conformity_description,
        inc_iatf_clause,
        inc_root_cause_due_date,
        inc_corrective_action_date,
        inc_action_description,
        inc_action_type,
        inc_usr_id,
        inc_due_date,
        inc_status,
        inc_qms_comments]
    
    pool.query('INSERT INTO incidences(inc_identificator,inc_class,inc_area,inc_non_conformity_description,inc_iatf_clause,inc_root_cause_due_date,inc_corrective_action_date,inc_action_description,inc_action_type,inc_usr_id,inc_due_date,inc_status,inc_qms_comments,inc_create_date,inc_update_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())',
    values, (dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createRecord", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new incidence ("+values+") by User: "+ req.body.user)//TODO: 
                }
            res.status(200).json({app: moduleName+".createRecord", message: "New record created"})
        }
    });

}

export const getRecordById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_users WHERE usr_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getUserById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getUserById", message: "User not exists"})
    }
}

export const updateRecordById = async (req, res) => {

    console.log(req.body)
    var query = ''
    var values = []

    if(req.body.usr_password){
        var usr_pwd_encrypt = await Users.encryptPassword(req.body.usr_password)
        values = [ req.params.id, req.body.usr_full_name, req.body.usr_email,usr_pwd_encrypt, req.body.usr_grp_id, req.body.usr_status] 
        query = 'UPDATE users SET usr_full_name = $2, usr_email = $3, usr_password = $4, usr_grp_id = $5,usr_status= $6 ,usr_update_date = NOW() WHERE usr_id = $1 '
    }else{
        values = [ req.params.id, req.body.usr_full_name, req.body.usr_email, req.body.usr_grp_id, req.body.usr_status]
        query = 'UPDATE users SET usr_full_name = $2, usr_email = $3, usr_grp_id = $4, usr_status= $5 ,usr_update_date = NOW() WHERE usr_id = $1 '
    }  
      
    if(req.params.id){

        
        pool.query(query,values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateUserById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating user ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateUserById", message: "User updated"})
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
                res.status(500).json({app: moduleName+".deleteUserById", message: "Internal database error"})
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
                res.status(500).json({app: moduleName+".disabledUserById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling user ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableUserById", message: "User disabled"})
            }
        });
    }
}

