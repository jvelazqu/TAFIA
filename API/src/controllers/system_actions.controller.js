import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'


const moduleName = 'Process actions'

export const getAllRecords = async (req, res) => {
    pool.query('SELECT * FROM v_get_system_actions', (dbError, results) => {
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

/*
    sac_id,
	sac_identificator,
	sac_class,
    sac_area,
	sac_non_conformity_description,
    sac_iatf_clause,
	sac_root_cause_due_date,
	sac_corrective_action_date,
	sac_action_description,
	sac_action_type,
	sac_responsible,
	sac_due_date,
	sac_status,
	sac_qms_comments,
	sac_user_id,
	sac_create_date
*/
    
    console.log(req.body)
  
    var now = + new Date()
 
    const {
        sac_identificator,
        sac_class,
        sac_area,
        sac_non_conformity_description,
        sac_iatf_clause,
        sac_root_cause_due_date,
        sac_corrective_action_date,
        sac_action_description,
        sac_action_type,
        sac_responsible,
        sac_due_date,
        sac_status,
        sac_qms_comments,
        sac_user_id
    } = req.body

    const values = [
        sac_identificator,
        sac_class,
        sac_area,
        sac_non_conformity_description,
        sac_iatf_clause,
        sac_root_cause_due_date,
        sac_corrective_action_date,
        sac_action_description,
        sac_action_type,
        sac_responsible,
        sac_due_date,
        sac_status,
        sac_qms_comments,
        sac_user_id
    ]
    
    pool.query('INSERT INTO system_actions (sac_identificator,sac_class,sac_area,sac_non_conformity_description,sac_iatf_clause,sac_root_cause_due_date,sac_corrective_action_date,sac_action_description,sac_action_type,sac_responsible,sac_due_date,sac_status,sac_qms_comments,sac_user_id,sac_create_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())',
    values, (dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            res.status(500).json({app: moduleName+".createRecord", message: "Internal database error"})                
        }else{
            if(config.AUDIT){
                    logger.info("Creating new record ("+values+") by User: "+ req.body.user)
                }
            res.status(200).json({app: moduleName+".createRecord", message: "New record created"})
        }
    });

}

export const getRecordById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_system_actions WHERE sac_id = $1', [req.params.id], (dbError, results) => {
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
/*
    sac_id,
	sac_identificator,
	sac_class,
    sac_area,
	sac_non_conformity_description,
    sac_iatf_clause,
	sac_root_cause_due_date,
	sac_corrective_action_date,
	sac_action_description,
	sac_action_type,
	sac_responsible,
	sac_due_date,
	sac_status,
	sac_qms_comments,
	sac_user_id,
	sac_create_date
*/
    
    console.log(req.body)
    var query = ''
     var values = []
    

    if (req.params.id) {
        values = [
            req.params.id,
            req.body.sac_identificator,
            req.body.sac_class,
            req.body.sac_area,
            req.body.sac_non_conformity_description,
            req.body.sac_iatf_clause,
            req.body.sac_root_cause_due_date,
            req.body.sac_corrective_action_date,
            req.body.sac_action_description,
            req.body.sac_action_type,
            req.body.sac_responsible,
            req.body.sac_due_date,
            req.body.sac_status,
            req.body.sac_qms_comments,
            req.body.sac_user_id
        ] 
        query = 'UPDATE system_actions SET '
            + 'sac_identificator = $2, '
            + 'sac_class = $3, '
            + 'sac_area = $4, '
            + 'sac_non_conformity_description = $5, '
            + 'sac_iatf_clause = $6, '
            + 'sac_root_cause_due_date = $7, '
            + 'sac_corrective_action_date = $8, '
            + 'sac_action_description = $9, '
            + 'sac_action_type = $10, '
            + 'sac_responsible = $11, '
            + 'sac_due_date = $12, '
            + 'sac_status = $13, '
            + 'sac_qms_comments = $14, '
            + 'sac_user_id = $15 '
            + 'WHERE sac_id = $1'

        console.log(query)

        pool.query(query,values,(dbError, results) => {
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
        pool.query('DELETE FROM system_actions WHERE sac_id = $1', [req.params.id], (dbError, results) => {
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
        pool.query('UPDATE system_actions SET sac_status = $2 WHERE sac_id = $1', [req.params.id, 'Archived'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disableRecordById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling record ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableRecordById", message: "Record disabled"})
            }
        });
    }
}

