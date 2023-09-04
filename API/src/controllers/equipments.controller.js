import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Equipments'

export const getAllEquipments = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_equipments', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllEquipments", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createEquipment = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.eqp_name, req.body.eqp_description, req.body.eqp_sua_id, 'On']
    
    pool.query('INSERT INTO equipments(eqp_name, eqp_description, eqp_sua_id, eqp_status, eqp_create_date, eqp_update_date) VALUES($1, $2, $3, $4, NOW(), NOW())',values,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createEquipment", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new equipment ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createEquipment", message: "Equipment created"})
        }
    });
}

export const getEquipmentById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_equipments WHERE eqp_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getEquipmentById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getEquipmentById", message: "Equipment not exists"})
    }
}

export const updateEquipmentById = async (req, res) => {
    
    const values = [ req.params.id, req.body.eqp_description, req.body.eqp_status, req.body.eqp_sua_id]
    
    if(req.params.id){
        pool.query('UPDATE equipments SET eqp_description = $2, eqp_status = $3, eqp_sua_id= $4, eqp_update_date = NOW() WHERE eqp_id = $1 ',values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateEquipmentById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating equipment ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateEquipmentById", message: "Equipment updated"})
            }
        });
    }

    
}

export const deleteEquipmentById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM equipments WHERE eqp_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteEquipmentById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting equipment ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"deleteEquipmentById", message: "Equipment deleted"})
            }
        });
    }
}

export const disableEquipmentById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE equipments SET eqp_status = $2, eqp_update_date = NOW()  WHERE eqp_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledEquipmentById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling equipment ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableEquipmentById", message: "Equipment disabled"})
            }
        });
    }
}

