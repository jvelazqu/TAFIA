import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'


const moduleName = 'Process actions'

export const getAllRecords = async (req, res) => {
    pool.query('SELECT * FROM v_get_process_actions', (dbError, results) => {
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
    console.log(req.body)
  
    var now = + new Date()
 
    const {
        pac_business_area,
        pac_project,
        pac_item,
        pac_reference,
        pac_audit_results,
		pac_score,
        pac_immediate_action,
        pac_causes,
        pac_corrective_actions,
        pac_due_date,
        pac_responsible,
        pac_due_implementation_date,
        pac_verification_date,
        pac_status,
        pac_qms_comments,
        pac_user_id
    } = req.body

    const values = [
        pac_business_area,
        pac_project,
        pac_item,
        pac_reference,
        pac_audit_results,
		pac_score,
        pac_immediate_action,
        pac_causes,
        pac_corrective_actions,
        pac_due_date,
        pac_responsible,
        pac_due_implementation_date,
        pac_verification_date,
        pac_status,
        pac_qms_comments,
        pac_user_id,
    ]
    
    pool.query('INSERT INTO process_actions (pac_business_area, pac_project,pac_item,pac_reference,pac_audit_results,pac_score,pac_immediate_action,pac_causes,pac_corrective_actions,pac_due_date,pac_responsible,pac_due_implementation_date,pac_verification_date,pac_status,pac_qms_comments,pac_user_id,pac_create_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())',
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
        pool.query('SELECT * FROM v_get_process_actions WHERE pac_id = $1', [req.params.id], (dbError, results) => {
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
    pac_business_area,
        pac_project,
        pac_item,
        pac_reference,
        pac_audit_results,
		pac_score,
        pac_immediate_action,
        pac_causes,
        pac_corrective_actions,
        pac_due_date,
        pac_responsible,
        pac_due_implementation_date,
        pac_verification_date,
        pac_status,
        pac_qms_comments,
        pac_user_id,
*/
    
    console.log(req.body)
    var query = ''
    var values = []
      
    if (req.params.id) {
        values = [
            req.params.id,
            req.body.pac_business_area,
            req.body.pac_project,
            req.body.pac_item,
            req.body.pac_reference,
            req.body.pac_audit_results,
			req.body.pac_score,
            req.body.pac_immediate_action,
            req.body.pac_causes,
            req.body.pac_corrective_actions,
            req.body.pac_due_date,
            req.body.pac_responsible,
            req.body.pac_due_implementation_date,
            req.body.pac_verification_date,
            req.body.pac_status,
            req.body.pac_qms_comments,
            req.body.pac_user_id
        ] 
        query = 'UPDATE process_actions SET '
            + 'pac_business_area = $2, '
            + 'pac_project = $3, '
            + 'pac_item = $4, '
            + 'pac_reference = $5, '
            + 'pac_audit_results = $6, '
			+ 'pac_score = $7, '
            + 'pac_immediate_action = $8, '
            + 'pac_causes = $9, '
            + 'pac_corrective_actions = $10, '
            + 'pac_due_date = $11, '
            + 'pac_responsible = $12, '
            + 'pac_due_implementation_date = $13, '
            + 'pac_verification_date = $14, '
            + 'pac_status = $15, '
            + 'pac_qms_comments = $16, '
            + 'pac_user_id = $17 '
            + 'WHERE pac_id = $1'

     //   console.log(query)

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
        pool.query('DELETE FROM process_actions WHERE pac_id = $1', [req.params.id], (dbError, results) => {
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

    if (req.params.id) {
        pool.query('UPDATE process_actions SET pac_status = $2 WHERE pac_id = $1', [req.params.id, 'Archived'], (dbError, results) => {
            if (dbError) {
                if (config.DEBUG) {
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({ app: moduleName + ".disableRecordById", message: "Internal database error" })
            } else {
                if (config.AUDIT) {
                    logger.info("Disabling record (" + req.params.id + ") by User: " + req.body.user)
                }
                res.status(200).json({ app: moduleName + "disableRecordById", message: "Record disabled" })
            }
        });
    }
}
