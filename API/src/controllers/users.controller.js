import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'
import Users from '../models/user'

const moduleName = 'Users'

export const getAllUsers = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_users', (dbError, results) => {
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

export const createUser = async (req, res) => {
     console.log(req.body)
  
    var now = + new Date()

    const { usr_name, usr_full_name, usr_email, usr_password, usr_grp_id} = req.body
    var usr_pwd_encrypt = await Users.encryptPassword(usr_password)
    const values = [usr_name, usr_full_name, usr_email, usr_pwd_encrypt, usr_grp_id, 'On']
    
    
    pool.query('INSERT INTO users(usr_name, usr_full_name, usr_email, usr_password, usr_grp_id, usr_status, usr_create_date, usr_update_date) VALUES($1, $2, $3, $4, $5, $6, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createUser", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new user ("+values+") by User: "+ req.body.user)//TODO: 
                }
            res.status(200).json({app: moduleName+".createUser", message: "User created"})
        }
    });
    
}

export const getUserById = async (req, res) => {
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

export const updateUserById = async (req, res) => {

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

export const deleteUserById = async (req, res) => {

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

export const disableUserById = async (req, res) => {

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

