import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Units'

export const getAllUnits = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_Units', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllUnits", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createUnit = async (req, res) => {
    
    var {unit_serial_number, unit_type, unit_status, transaction, process_step, process_name, equipment, job} = req.body;
    const transactions = ['unit_create']
    const status = ['PASS', 'FAIL', 'SCRAP', 'BLOCKED']

    if(!unit_serial_number){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1001", message: "Serial number is missing"})
    }else if(!unit_type){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1002",message: "Unit type is missing"})
    }else if(!unit_status){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1003",message: "Unit status is missing"})
    }else if(!transaction){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1004",message: "Unit transaction is missing"})
    }else if(!process_step){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1005",message: "Process step is missing"})
    }else if(!process_name){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1006",message: "Process name is missing"})
    }else if(!equipment){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1007",message: "Equipment name is missing"})
    }else if(!job){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1012",message: "Job is missing"})
    }else{

        // Checking if Job is available
        pool.query('SELECT checkJob($1)',[job.toUpperCase()],(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.fatal("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".createUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail})                
            }else{
                var sqlMessage = results.rows[0].checkjob.split('|')
                console.log(sqlMessage[0])
                if(sqlMessage[0] != 0){
                    res.status(200).json({app: moduleName+".createUnit", messageCode: sqlMessage[0],message: sqlMessage[1]})
                }else{
                    // Checking if unit exists
                    pool.query('SELECT checkIfUnitExists($1,$2)',[unit_serial_number,unit_type.toUpperCase()],(dbError, results) => {
                        if (dbError){
                            if(config.DEBUG){
                                logger.fatal("Database error: " + dbError)
                            } 
                            res.status(500).json({app: moduleName+".createUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail})                
                        }else{
                            if(!results.rows[0].checkifunitexists){
                                // Get ID del unit type
                                pool.query('SELECT uty_id FROM unit_types WHERE uty_name = $1',[unit_type],(dbError_2, results_2) => {
                                    if(dbError_2){
                                        if(config.DEBUG){
                                            logger.fatal("Database error: " + dbError)
                                        }
                                        res.status(500).json({app: moduleName+".createUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError_2.detail})
                                    }else{
                                        //console.log(results_2.rows[0].uty_id)
                                        if(!results_2.rows[0]){
                                            res.status(400).json({app: moduleName+".createUnit", messageCode: "1009", message: "Unit Type does not exists"})                                
                                        }else{                                
                                            const unit_type_id = results_2.rows[0].uty_id

                                            // Check if unit transaction is valid
                                            const found = transactions.find(element => element == transaction.toLowerCase());
                                            if (typeof found === 'undefined'){
                                                res.status(400).json({app: moduleName+".createUnit", messageCode: "1010", message: "Unit transaction does not exists"})
                                            }else{
                                                // Check if status is PASS or FAIL
                                                if(!(unit_status.toUpperCase() === 'FAIL' || unit_status.toUpperCase() === 'PASS')){
                                                    res.status(400).json({app: moduleName+".createUnit", messageCode: "1011", message: "Unit status does not exists"})
                                                }else{
                                                    pool.query('SELECT getProcessId($1,$2, $3, $4)',[process_step,process_name,equipment,job],(dbError_3, results_3) => {
                                                        if(dbError_2){
                                                            if(config.DEBUG){
                                                                logger.fatal("Database error: " + dbError)
                                                            }
                                                            res.status(500).json({app: moduleName+".createUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError_3.detail})
                                                        }else{
                                                            const process_id = results_3.rows[0].getprocessid
                                                            if(!process_id){
                                                                res.status(400).json({app: moduleName+".createUnit", messageCode: "1013", message: "Process not found in the job"})
                                                            }else{
                                                                pool.query('SELECT job_id FROM jobs WHERE job_name = $1',[job],(dbError_4, results_4) => {
                                                                    if(dbError_4){
                                                                        if(config.DEBUG){
                                                                            logger.fatal("Database error: " + dbError)
                                                                        }
                                                                        res.status(500).json({app: moduleName+".createUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError_4.detail})
                                                                    }else{
                                                                        const job_id = results_4.rows[0].job_id
                                                                        if(!job_id){
                                                                            res.status(400).json({app: moduleName+".createUnit", messageCode: "1014", message: "Job not found"})
                                                                        }else{
                                                                            // Check if the initial process
                                                                            console.log('process_step: '+process_step+', process_name: '+process_name+', job_id: '+job_id)
                                                                            pool.query('SELECT checkinitialprocess($1,$2,$3)',[process_step,process_name,job_id],(dbError_5, results_5) => {
                                                                                if(dbError_5){
                                                                                    if(config.DEBUG){
                                                                                        logger.fatal("Database error: " + dbError)
                                                                                    }
                                                                                    res.status(500).json({app: moduleName+".createUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError_5.detail})
                                                                                }else{
                                                                                    if(!results_5.rows[0].checkinitialprocess){
                                                                                        res.status(400).json({app: moduleName+".createUnit", messageCode: "1015", message: "Only can create units on the initial process in the job"})
                                                                                    }else{
                                                                                        //SELECT createunit('U0002',1,1,1)
                                                                                        pool.query('SELECT createunit($1,$2,$3,$4)',[unit_serial_number,unit_type_id,process_id,job_id],(dbError_6, results_6) => {
                                                                                            if(dbError_6){
                                                                                                if(config.DEBUG){
                                                                                                    logger.fatal("Database error: " + dbError)
                                                                                                }
                                                                                                res.status(500).json({app: moduleName+".createUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError_6.detail})
                                                                                            }else{
                                                                                                res.status(200).json({app: moduleName+".createUnit", messageCode: "0", message: "Unit created [ Unit serial: "+unit_serial_number +", unit_type_id: "+unit_type_id + ", Process Id: "+ process_id + ", Job Id: "+ job_id+"]"})
                                                                                            }
                                                                                        })
                                                                                    }                                                                         
                                                                                }
                                                                            })                                                                
                                                                        }
                                                                    }
                                                                })
                                                                
                                                            }                                                
                                                        }
                                                    })                                        
                                                }                                    
                                            }
                                        }
                                    }
                                })
                            }else{
                                res.status(400).json({app: moduleName+".createUnit", messageCode: "1008",message: "Unit already exists ("+unit_serial_number+"/"+unit_type+")"})
                            } 
                        }
                    })
                }

                
            }
            
        })
    }
}

export const startUnit = async (req, res) => {
    
    var {unit_serial_number, unit_type, transaction, process_step, process_name, equipment, job} = req.body;

    if(!unit_serial_number){
        res.status(400).json({app: moduleName+".startUnit", messageCode: "1001", message: "Serial number is missing"})
    }else if(!unit_type){
        res.status(400).json({app: moduleName+".startUnit", messageCode: "1002",message: "Unit type is missing"})
    }else if(!transaction){
        res.status(400).json({app: moduleName+".startUnit", messageCode: "1004",message: "Unit transaction is missing"})
    }else if(!process_step){
        res.status(400).json({app: moduleName+".startUnit", messageCode: "1005",message: "Process step is missing"})
    }else if(!process_name){
        res.status(400).json({app: moduleName+".startUnit", messageCode: "1006",message: "Process name is missing"})
    }else if(!equipment){
        res.status(400).json({app: moduleName+".startUnit", messageCode: "1007",message: "Equipment name is missing"})
    }else if(!job){
        res.status(400).json({app: moduleName+".startUnit", messageCode: "1012",message: "Job is missing"})
    }else{
        // Checking if unit exists
        pool.query('SELECT startUnit($1,$2,$3,$4,$5,$6,$7)',[unit_serial_number, unit_type, transaction, process_step, process_name, equipment, job],(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.fatal("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".startUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail})                
            }else{
                console.log(results.rows[0].startunit)
                var sqlMessage = results.rows[0].startunit.split('|')
                
                res.status(200).json({app: moduleName+".startUnit", messageCode: sqlMessage[0],message: sqlMessage[1]})
            }
        });        
    }
}

export const finishUnit = async (req, res) => {

    //console.log(req.body)    
    var {unit_serial_number, unit_type_in, unit_type_out, unit_status, transaction, process_step, process_name, equipment, job} = req.body;

    if(!unit_serial_number){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1001", message: "Serial number is missing"})
    }else if(!unit_type_in){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1003",message: "Initial unit type is missing"})
    }else if(!unit_type_out){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1003",message: "Final unit type is missing"})
    }else if(!unit_status){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1003",message: "Final unit status is missing"})
    }else if(!transaction){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1004",message: "Unit transaction is missing"})
    }else if(!process_step){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1005",message: "Process step is missing"})
    }else if(!process_name){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1006",message: "Process name is missing"})
    }else if(!equipment){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1007",message: "Equipment name is missing"})
    }else if(!job){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1012",message: "Job is missing"})
    }else{
        // Checking if unit exists SELECT finishUnit('U0026','assy','assy','PASS','unit_finish',2,'PROCESS1','EQP2','JOB003');
        pool.query('SELECT finishUnit($1,$2,$3,$4,$5,$6,$7,$8,$9)',[unit_serial_number, unit_type_in, unit_type_out, unit_status, transaction, process_step, process_name, equipment, job],(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.fatal("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".finishUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail})                
            }else{
                console.log(results.rows[0].finishunit)
                var sqlMessage = results.rows[0].finishunit.split('|')
                
                res.status(200).json({app: moduleName+".finishUnit", messageCode: sqlMessage[0],message: sqlMessage[1]})
            }
        });        
    }
}

export const processUnit = async (req, res) => {
    
    var {unit_serial_number, unit_type_in, unit_type_out, unit_status, transaction, process_step, process_name, equipment, job} = req.body;

    if(!unit_serial_number){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1001", message: "Serial number is missing"})
    }else if(!unit_type_in){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1003",message: "Initial unit type is missing"})
    }else if(!unit_type_out){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1003",message: "Final unit type is missing"})
    }else if(!unit_status){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1003",message: "Final unit status is missing"})
    }else if(!transaction){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1004",message: "Unit transaction is missing"})
    }else if(!process_step){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1005",message: "Process step is missing"})
    }else if(!process_name){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1006",message: "Process name is missing"})
    }else if(!equipment){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1007",message: "Equipment name is missing"})
    }else if(!job){
        res.status(400).json({app: moduleName+".finishUnit", messageCode: "1012",message: "Job is missing"})
    }else{
        pool.query('SELECT processUnit($1,$2,$3,$4,$5,$6,$7,$8,$9)',[unit_serial_number, unit_type_in, unit_type_out, unit_status, transaction, process_step, process_name, equipment, job],(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.fatal("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".processUnit", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail})                
            }else{
                console.log(results.rows[0].processunit)
                var sqlMessage = results.rows[0].processunit.split('|')
                
                res.status(200).json({app: moduleName+".processUnit", messageCode: sqlMessage[0],message: sqlMessage[1]})
            }
        });      
    }
}

export const getUnitsByProcess = async (req, res) => {
    console.log(req.params.id)
    if(req.params.id){
        pool.query('SELECT * from v_get_units_by_process WHERE prc_id = $1 ORDER BY uni_update_date DESC', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getUnitsByProcess", message: "Internal database error"})                
            }else{
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getUnitsByProcess", message: "Process does not exists"})
    }
}

export const getUnitHistory = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_units_history WHERE uni_id = $1 ORDER BY unh_transaction_date DESC', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getUnitHistory", message: "Internal database error"})                
            }else{
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getUnitHistory", message: "Unit does not exists"})
    }
}

export const getUnitById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_Units WHERE usr_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getUnitById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getUnitById", message: "Unit not exists"})
    }
}

export const getUnitHistoryBySerialNumber = async (req, res) => {
    var query = ''
    const unit_serial_number = req.query.serial
    const unit_type = req.query.type

    if(!req.query.serial){
        res.status(400).json({app: moduleName+".createUnit", messageCode: "1001", message: "Serial number is missing"})
    }else{
        if(req.query.type){
            query = `SELECT * FROM v_get_units_history WHERE uni_serial_number = '${unit_serial_number}' AND uty_name = '${unit_type.toUpperCase()}'`
        }else{
            query = `SELECT * FROM v_get_units_history WHERE uni_serial_number = '${unit_serial_number}'`
        }
        console.log(query)
        pool.query(query, (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".createUnit", messageCode: "9999", message: "Internal database error"})                
            }else{
                console.log(results.rowCount)
                res.status(200).json(results.rows)
            }
        })
    }

    

}

export const updateUnitById = async (req, res) => {

    console.log(req.body)
    var query = ''
    var values = []

    if(req.body.usr_password){
        var usr_pwd_encrypt = await Units.encryptPassword(req.body.usr_password)
        values = [ req.params.id, req.body.usr_full_name, req.body.usr_email,usr_pwd_encrypt, req.body.usr_grp_id, req.body.usr_status] 
        query = 'UPDATE Units SET usr_full_name = $2, usr_email = $3, usr_password = $4, usr_grp_id = $5,usr_status= $6 ,usr_update_date = NOW() WHERE usr_id = $1 '
    }else{
        values = [ req.params.id, req.body.usr_full_name, req.body.usr_email, req.body.usr_grp_id, req.body.usr_status]
        query = 'UPDATE Units SET usr_full_name = $2, usr_email = $3, usr_grp_id = $4, usr_status= $5 ,usr_update_date = NOW() WHERE usr_id = $1 '
    }  
      
    if(req.params.id){

        
        pool.query(query,values,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateUnitById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating Unit ("+req.params.id+") by Unit: "+ req.body.Unit)
                }
                res.status(200).json({app: moduleName+".updateUnitById", message: "Unit updated"})
            }
        });
    }

    
}

export const deleteUnitById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM Units WHERE usr_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".deleteUnitById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Deleting Unit ("+req.params.id+") by Unit: "+ req.body.Unit)
                }
                res.status(200).json({app: moduleName+"deleteUnitById", message: "Unit deleted"})
            }
        });
    }
}

export const disableUnitById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE Units SET usr_status = $2, usr_update_date = NOW() WHERE usr_id = $1', [req.params.id, 'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledUnitById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling Unit ("+req.params.id+") by Unit: "+ req.body.Unit)
                }
                res.status(200).json({app: moduleName+"disableUnitById", message: "Unit disabled"})
            }
        });
    }
}

export const getIdUnitType = async (req, res) => {

    console.log(req)
/*
    pool.query('SELECT uty_id FROM unit_tyes WHERE uty_name = $1', [req], (dbError, results) => {
        if (dbError){
            if(config.DEBUG){
                logger.error("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".disabledUnitById", message: "Internal database error"})
        }else{
            if(config.AUDIT){
                logger.info("Disabling Unit ("+req.params.id+") by Unit: "+ req.body.Unit)
            }
            res.status(200).json({app: moduleName+"disableUnitById", message: "Unit disabled"})
        }
    });
    */
}