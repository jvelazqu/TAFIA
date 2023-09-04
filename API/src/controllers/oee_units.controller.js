import pool from '../database'
import config from '../config'
import {logger} from '../libs/utils'

const moduleName = 'OEE_Units'

export const register_piece = async (req, res) => {
    
    var now = +new Date()

    const values = [ req.body.station, req.body.product, req.body.status]
    
    // Getting Product ID
    if (req.body.status.toUpperCase() != 'P' && req.body.status.toUpperCase() != 'F'){
        res.status(400).json({ app: moduleName + ".register_piece", messageCode: "1009", message: "Status not permitted, use only P or F"})
    } else {
        pool.query('SELECT prd_id FROM products WHERE prd_name = $1', [req.body.product], (dbError, results) => {
            if (dbError) {
                if (config.DEBUG) {
                    logger.fatal("Database error: " + dbError)
                }
                res.status(500).json({ app: moduleName + ".register_piece", messageCode: "9999", message: "Internal database error", messageDescription: dbError.detail })
            } else {
                if (!results.rows[0]) {
                    res.status(400).json({ app: moduleName + ".register_piece", messageCode: "1009", message: "Product does not exists"})
                } else {
                    const prd_id = results.rows[0].prd_id

                    //Getting Equipment ID
                    pool.query('SELECT eqp_id FROM equipments WHERE eqp_name = $1', [req.body.station], (dbError_1, results_1) => {
                        if (dbError_1) {
                            if (config.DEBUG) {
                                logger.fatal("Database error: " + dbError_1)
                            }
                            res.status(500).json({ app: moduleName + ".register_piece", messageCode: "9999", message: "Internal database error", messageDescription: dbError_1.detail })
                        } else {
                            if (!results_1.rows[0]) {
                                res.status(400).json({ app: moduleName + ".register_piece", messageCode: "1009", message: "Equipment does not exists"})
                            } else {
                                const eqp_id = results_1.rows[0].eqp_id  
                                
                                // Register Unit
                                pool.query('INSERT INTO oee_units (oee_uni_prd_id, oee_uni_eqp_id, oee_uni_status,oee_uni_date) VALUES($1, $2 ,$3, NOW())',[prd_id,eqp_id,req.body.status], (dbError_3, results_3) => {
                                    if (dbError_3) {
                                        if (config.DEBUG) {
                                            logger.fatal("Database error: " + dbError_3)
                                        }
                                        res.status(500).json({ app: moduleName + ".register_piece", messageCode: "9999", message: "Internal database error", messageDescription: dbError_3.detail })
                                    } else {
                                        res.status(200).json({ app: moduleName + ".register_piece", message: "Piece registered" })
                                    }
                                    
                                    
                                });
                            }
                            

                        }
                    });
                // res.status(200).json({ app: moduleName + "register_piece", message: "Piece registered" + prd_id })
                }
            }
        }); 
    }

                                                    
}
