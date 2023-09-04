import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'Jobs'

export const getAllJobs = async (req, res) => {
    pool.query('SELECT * FROM v_get_all_jobs ORDER BY job_last_update_date', (dbError, results) => {
        if (dbError) {
            if(config.DEBUG){
                logger.fatal("Database error: " + dbError)
            }
            res.status(500).json({app: moduleName+".getAllJobs", message: "Internal database error (" + dbError + ")"})
        }else{
            res.status(200).json(results.rows)
        }    
    }
  )
}

export const createJob = async (req, res) => {    
    
   // console.log(req.body)
    var job_expiration_date = '9999-12-31'

    if(req.body.job_expiration_date){
        job_expiration_date = req.body.job_expiration_date
    }
     
    job_expiration_date += ' 23:59:59'
    
    if(!req.body.job_name){
        res.status(400).json({app: moduleName+".createJob", message: "Job name can't be empty"})
    }else if(!req.body.job_quantity){
        res.status(400).json({app: moduleName+".createJob", message: "Job quantity can't be empty"})
    }else if(!req.body.job_prd_id){
        res.status(400).json({app: moduleName+".createJob", message: "Product id can't be empty"})
    }else if(!req.body.processes){
        res.status(400).json({app: moduleName+".createCompleteJob", message: "Product name can't be empty"})
    }else{
        const query = `INSERT INTO jobs(job_name, job_description, job_prd_id, job_quantity, job_type, job_location, job_status, job_create_date, job_update_date,job_expiration_date, job_remaining_units) `+
                  `VALUES('${req.body.job_name.toUpperCase()}','${req.body.job_description}',${req.body.job_prd_id},${req.body.job_quantity},'Manual',1,'New',NOW(),NOW(), '${job_expiration_date}', ${req.body.job_quantity})`
    
        //console.log(query)    

        pool.query(query,(dbError, results) => {        
            if (dbError){
                if(config.DEBUG){
                    logger.fatal("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".createJob", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail})
            }else{
                if(config.AUDIT){
                    logger.info("Creating new job ("+req.body.job_name+") by User: "+ req.body.user)
                }
                req.body.processes.forEach(process => {                        
                    var query2processes = `INSERT INTO processes(prc_name, prc_description, prc_step, prc_status, prc_type, prc_job_id, prc_eqp_id, prc_create_date, prc_update_date) `+
                        `VALUES ('${process.prc_name.toUpperCase()}', '${process.prc_description}', ${process.prc_step}, 'On', '${process.prc_type.toUpperCase()}', `+ 
                        `(SELECT job_id FROM jobs WHERE job_name = '${req.body.job_name.toUpperCase()}'),${process.eqp_id}, NOW(), NOW())`
                    
                    //console.log(query2processes)

                    pool.query(query2processes,(dbError_1, results_1) => {
                        if (dbError_1){
                            if(config.DEBUG){
                                logger.fatal("Database error: " + dbError_1)
                            } 
                            //res.status(500).json({app: moduleName+".createJob", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail})
                        }else{
                            if(config.DEBUG){
                                logger.info("Process created")
                            }                            
                        }
                    })
                }) 
                res.status(200).json({app: moduleName+".createJob", messageCode: "0", message: "Job created: "+req.body.job_name.toUpperCase()})               
            }
        });
    }
}

export const getJobById = async (req, res) => {
    if(req.params.id){
        pool.query('SELECT * FROM v_get_jobs WHERE job_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".getJobById", message: "Internal database error"})                
            }else{
                //logger.trace(results.rows) 
                res.status(200).json(results.rows)
            }
        })
    }else{
        res.status(404).json({app: moduleName+".getJobById", message: "Job not exists"})
    }
}

export const updateJobById = async (req, res) => {
    console.log(req.body)
    const job_expiration_date = req.body.job_expiration_date + ' 23:59:59'
    const values = [ req.params.id, req.body.job_quantity, job_expiration_date]
    
    var query = `UPDATE jobs SET job_quantity=${req.body.job_quantity}, job_remaining_units = (${req.body.job_quantity} - (job_quantity - job_remaining_units)), job_update_date = NOW(), job_expiration_date = '${req.body.job_expiration_date + ' 23:59:59'}' WHERE job_id = ${req.params.id} `
    console.log(query)

    if(req.params.id){
        pool.query(query,(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".updateJobById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating job ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".updateJobById", message: "Job updated"})
            }
        });
    } 
}

export const deleteJobById = async (req, res) => {

    if(req.params.id){
        pool.query('DELETE FROM processes WHERE prc_job_id = $1', [req.params.id], (dbError, results) => {
            if (dbError){
                res.status(500).json({app: moduleName+".deleteJobById", message: "Internal database error"})
            }else{
                pool.query('DELETE FROM jobs WHERE job_id = $1', [req.params.id], (dbError_1, results_1) => {
                if (dbError_1){
                    if(config.DEBUG){
                        logger.error("Database error: " + dbError_1)
                    }
                    res.status(500).json({app: moduleName+".deleteJobById", message: "Internal database error"})
                }else{
                    if(config.AUDIT){
                        logger.info("Deleting job ("+req.params.id+") by User: "+ req.body.user)
                    }
                    res.status(200).json({app: moduleName+"deleteJobById", message: "Job deleted"})
                }
            });
            }
        });

        
    }
}

export const disableJobById = async (req, res) => {

    if(req.params.id){
        pool.query('UPDATE jobs SET job_status = $2, job_update_date = NOW()  WHERE job_id = $1', [req.params.id,'Off'], (dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                }
                res.status(500).json({app: moduleName+".disabledJobById", message: "Internal database error"})
            }else{
                if(config.AUDIT){
                    logger.info("Disabling job ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+"disableJobById", message: "Job disabled"})
            }
        });
    }
}

export const createCompleteJob = async (req, res) => {

    var job_status = req.body.job_status
    //var job_expiration_date = req.body.job_expiration_date
    var job_expiration_date = '9999-12-31'
    //var job_start_date = new Date(req.body.job_start_date).toISOString().slice(0, 19).replace('T', ' ')
    if(!req.body.job_name){
        res.status(400).json({app: moduleName+".createCompleteJob", message: "Job name can't be empty"})
    }else if(!req.body.job_quantity){
        res.status(400).json({app: moduleName+".createCompleteJob", message: "Job quantity can't be empty"})
    }else if(!req.body.job_type){
        res.status(400).json({app: moduleName+".createCompleteJob", message: "Job type can't be empty"})
    }else if(!req.body.product_name){
        res.status(400).json({app: moduleName+".createCompleteJob", message: "Product name can't be empty"})
    }else if(!req.body.processes){
        res.status(400).json({app: moduleName+".createCompleteJob", message: "You need provide the processes"})
    }else{
        if(!req.body.job_status) job_status = 'New'
        
        if(req.body.job_expiration_date){
            job_expiration_date = req.body.job_expiration_date
        }
        job_expiration_date += ' 23:59:59'

        var query = `INSERT INTO public.jobs(job_name, job_description, job_prd_id, job_quantity, job_type, job_location, job_status, job_create_date, 
        job_update_date, job_expiration_date, job_remaining_units) VALUES ('${req.body.job_name.toUpperCase()}', '${req.body.job_description}',
        (SELECT prd_id FROM products WHERE prd_name = '${req.body.product_name}' AND prd_status = 'On'),
        ${req.body.job_quantity}, '${req.body.job_type}', 
        (SELECT loc.loc_id FROM locations loc, system_parameters syp WHERE syp_name = 'default_location' and loc.loc_name = syp.syp_value), 
        '${job_status}', NOW(), NOW(), '${job_expiration_date}', ${req.body.job_quantity})`

        pool.query(query,(dbError, results) => {        
            if (dbError){
                if(config.DEBUG){
                    logger.fatal("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".createCompleteJob", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail})
            }else{
                if(config.AUDIT){
                    if(!req.body.user) req.body.user = 'Anonymous'
                        logger.info("Creating new job ("+req.body.job_name+") by User: "+ req.body.user)
                    }
                    
                    req.body.processes.forEach(process => {
                        
                        var query2processes = `INSERT INTO public.processes(
                            prc_name, prc_description, prc_step, prc_status, prc_type, prc_job_id, prc_eqp_id, prc_create_date, prc_update_date)
	                        VALUES ('${process.prc_name.toUpperCase()}', '${process.prc_description}', ${process.prc_step}, 'On', '${process.prc_type.toUpperCase()}', 
                            (SELECT job_id FROM jobs WHERE job_name = '${req.body.job_name.toUpperCase()}'),
                            (SELECT eqp_id FROM equipments WHERE eqp_name = '${process.eqp_name.toUpperCase()}'), NOW(), NOW())`
                        
                        console.log(query2processes)
                        pool.query(query2processes,(dbError_1, results_1) => {
                            if (dbError_1){
                                if(config.DEBUG){
                                    logger.fatal("Database error: " + dbError_1)
                                } 
                                //res.status(500).json({app: moduleName+".createJob", message: "Internal database error"}) 
                            }else{
                                if(config.DEBUG){
                                    logger.info("Process created: " + query2processes)
                                }
                            }
                        })
                    })
                
                res.status(200).json({app: moduleName+".createJob", message: "Job created"})
            }
        });
    }

    
}

export const finishJobById = async (req, res) => {
    
    if(req.params.id){
        pool.query(`UPDATE jobs SET job_status = 'Finished', job_end_date = NOW(), job_update_date = NOW() WHERE job_id = $1 `,[req.params.id],(dbError, results) => {
            if (dbError){
                if(config.DEBUG){
                    logger.error("Database error: " + dbError)
                } 
                res.status(500).json({app: moduleName+".finishJobById", message: "Internal database error"})                
            }else{
                if(config.AUDIT){
                    logger.info("Updating job ("+req.params.id+") by User: "+ req.body.user)
                }
                res.status(200).json({app: moduleName+".finishJobById", message: "Job finished"})
            }
        });
    }

    
}