import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/user'
import Role from '../models/role'
import pool from '../database'

export const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({app: "authJwt.verifyToken",message: "No token provided"})

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;
        
        //const user = await User.findById(req.userId, {password: 0})
        //console.log(req.userId)
        //if(!user) return res.status(404).json({app: "authJwt.verifyToken",message: "User not found"})

        next()
    }catch(error){
        return res.status(501).json({app: "authJwt.verifyToken", message: "Unauthorized token"})
    }
};

export const isOperator = async (req, res, next) => {
    pool.query('SELECT * FROM v_get_all_users WHERE usr_id = $1', [req.userId], (error, results) => {
        if (error) {
            console.log("Database error: " + error)
            //logger.fatal("Require Operator role");
            throw error
            
        }else{
            //console.log(results.rows[0])
            if(results.rows[0].rol_name == "Operator"){
                //console.log("Is a Operator user type");
                next();
                return;
            }
            
        }
        return res.status(403).json({app: "authJwt.isOperator", message: "Require Operator role"})
    });
}

export const isSupervisor = async (req, res, next) => {
    pool.query('SELECT * FROM v_get_all_users WHERE usr_id = $1', [req.userId], (error, results) => {
        if (error) {
            console.log("Database error: " + error)
            //logger.fatal("Require Admin role");
            throw error
            
        }else{
            if(results.rows[0].rol_name == "Supervisor"){
                console.log("Is a Supervidor user type");
                next();
                return;
            }
            
        }
        return res.status(403).json({app: "authJwt.isSupervisor", message: "Require Supervisor role"})
    });
}

export const isManager = async (req, res, next) => {
    pool.query('SELECT * FROM v_get_all_users WHERE usr_id = $1', [req.userId], (error, results) => {
        if (error) {
            console.log("Database error: " + error)
            //logger.fatal("Require Admin role");
            throw error
            
        }else{
            console.log(results.rows[0])
            if(results.rows[0].rol_name == "Manager"){
                console.log("Is a Manager user type");
                next();
                return;
            }
            
        }
        return res.status(403).json({app: "authJwt.isManager", message: "Require Manager role"})
    });
}

export const isDirector = async (req, res, next) => {
    pool.query('SELECT * FROM v_get_all_users WHERE usr_id = $1', [req.userId], (error, results) => {
        if (error) {
            console.log("Database error: " + error)
            //logger.fatal("Require Admin role");
            throw error            
        }else{
            console.log(results.rows[0])
            if(results.rows[0].rol_name == "Director"){
                console.log("Is a Director user type");
                next();
                return;
            }           
        }
        return res.status(403).json({app: "authJwt.isDirector", message: "Require Director role"})
    });
}

export const isAdmin = async (req, res, next) => {
    
    pool.query('SELECT * FROM v_get_all_users WHERE usr_id = $1', [req.userId], (error, results) => {
        if (error) {
            console.log("Database error: " + error)
            //logger.fatal("Require Admin role");
            throw error
            
        }else{
            //console.log(results.rows)
            if(results.rows[0].rol_name == "Administrator"){
                next();
                return;
            }
            
        }
        return res.status(403).json({app: "authJwt.isAdmin", message: "Require Admin role"})
    });
}

