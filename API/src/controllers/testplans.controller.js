import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Testplans'

export const getAllrecords = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_testplans', (dbError, results) => {
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
    var query_a = ''
    var query = `INSERT INTO public.testplans(tes_name, tes_status, tes_release, tes_prc_id, tes_prd_id, tes_owner, tes_releaser, tes_create_date, tes_update_date)`+
	              `VALUES ('${req.body.tes_name}', '${req.body.tes_status}', ${req.body.tes_release}, ${req.body.tes_prc_id}, ${req.body.tes_prd_id}, '${req.body.tes_owner}', '${req.body.tes_releaser}', NOW(), NOW())`
    const testplan = req.body.testplan
    pool.query(query,(dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            } 
            //console.log(dbError)
            res.status(500).json({app: moduleName+".createRecord", message: "Internal database error ("+dbError.code+")"})                
        }else{
            if(config.AUDIT){
                logger.info("Creating new testplan ("+req.body.tes_name+") by User: "+ req.body.user)
            }

            console.log("---------->"+testplan.length+"<--------------")
            
            for (var i = 0; i < testplan.length; i++){
                console.log("==========> Prueba: "+i+"<=========")
                //console.log(testplan[i])
                query_a = `INSERT INTO public.testplan_releases(`+
	                    `tpr_tes_id, tpr_test_name,tpr_meas_type, tpr_low_limit, tpr_upper_limit, tpr_uom, tpr_nominal_value, tpr_tolerance, tpr_status, tpr_create_date) `+
	                    `VALUES ((SELECT tes_id FROM testplans WHERE tes_name = '${req.body.tes_name}' AND tes_release = ${req.body.tes_release} AND tes_prc_id = ${req.body.tes_prc_id}), `+
                        `'${testplan[i].tpr_test_name}','${testplan[i].tpr_meas_type}', ${testplan[i].tpr_low_limit}, ${testplan[i].tpr_upper_limit}, `+
                        `'${testplan[i].tpr_uom}', ${testplan[i].tpr_nominal_value}, ${testplan[i].tpr_tolerance}, '${testplan[i].tpr_status}', NOW())`
                console.log(query_a)
                pool.query(query_a,(dbError_1, results_1) => {
                    if (dbError_1){
                        if(config.DEBUG){
                            logger.fatal("Database error: " + dbError)
                        } 
                        //console.log(dbError)
                        res.status(500).json({app: moduleName+".createRecord", message: "Internal database error ("+dbError_1.code+")"})                
                    }
                })
            }            
            res.status(200).json({app: moduleName+".createRecord", message: "Record created"})
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
                res.status(500).json({app: moduleName+".getUserById", message: "Internal database error ("+dbError.code+")"})
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
                res.status(500).json({app: moduleName+".updateUserById", message: "Internal database error ("+dbError.code+")"})
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