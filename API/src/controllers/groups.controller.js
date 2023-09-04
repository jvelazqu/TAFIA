import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Groups'

export const getAllGroups = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_groups', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllGroups", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createGroup = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.grp_name, req.body.grp_description, 'On']
    
    pool.query('INSERT INTO groups(grp_name, grp_description, grp_status, grp_create_date, grp_update_date) VALUES($1, $2, $3, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createGroup", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new group ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createGroup", message: "Group created"})
        }
    });
}

export const getGroupById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_groups WHERE grp_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getGroupById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getGroupById", message: "Group not exists"})
    }
}

export const updateGroupById = async (req, res) => {
    
    const values = [ req.params.id, req.body.grp_description, req.body.grp_status]
    
    if(req.params.id){
        pool.query('UPDATE groups SET grp_description = $2, grp_status = $3, grp_update_date = NOW() WHERE grp_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateGroupById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating group ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateGroupById", message: "Group updated"})
            }
        });
    }

    
}

export const deleteGroupById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM groups WHERE grp_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteGroupById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting group ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteGroupById", message: "Group deleted"})
            }
        });
    }
}

export const disableGroupById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE groups SET grp_status = $2, grp_update_date = NOW()  WHERE grp_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledGroupById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling group ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableGroupById", message: "Group disabled"})
            }
        });
    }
}

