import { JsonWebTokenError } from 'jsonwebtoken'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/role'
import user from '../models/user'
import { token } from 'morgan'
import pool from '../database'
import {logger} from '../libs/utils'

export const signUp = async (req, res) => {
    const {name, username, email, password, roles} = req.body;
    /*
    const newUser = new User({
        name,
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role.id)
    }else{
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role.id];
    }

    const saveUser = await newUser.save();
    console.log(saveUser);

    const token = jwt.sign({id: saveUser._id},config.SECRET,{
        expiresIn: 86400  // 24 hours
    })

    res.status(200).json({token})
    */
};

export const signIn = async (req, res) => {

    var password2Compare = false;
    const usr_name = req.body.usr_name;
    const usr_password = req.body.password;
    console.log(req.body)
    const query = `SELECT * FROM users WHERE usr_name = '${usr_name}' AND crypt('${usr_password}', usr_password) = usr_password AND usr_status = 'On'`
    console.log(query)

    pool.query("SELECT * FROM users WHERE usr_name = $1 AND crypt($2, usr_password) = usr_password AND usr_status = 'On'", [usr_name,usr_password], (err, result) => {        
        if (err) {
            logger.fatal("Database error: "+err)
            return res.status(500).json({app: "auth.sinIn", message: "Database error", token: null,})
        }

        if (!result.rows.length){            
            logger.info("User or password not valid: "+usr_name)
            return res.status(404).json({app: "auth.sinIn", message: "User or password not valid", token: null})          
        }else{
            
            logger.info("User valid: "+result.rows[0].usr_name)
            
            const token = jwt.sign({id: result.rows[0].usr_id},  config.SECRET, {
                expiresIn: 86400
            })
            console.log("Full name: "+result.rows[0].usr_full_name)
            res.status(200).json({
                "app": "auth.sinIn",
                "message": "User valid",
                "id": ""+result.rows[0].usr_id+"",
                "username": ""+result.rows[0].usr_name+"",
                "full_name": ""+result.rows[0].usr_full_name+"",
                "email": ""+result.rows[0].usr_email+"",
                "group_id": ""+result.rows[0].usr_grp_id+"",
                "token": ""+token+""
            });
        }
    });  
}

export const isAdmin = async (req, res) => {    
    res.status(200).json({app:"auth.isAdmin", message: "User admin"})
}

export const isSupervisor = async (req, res) => {    
    res.status(200).json({app:"auth.isSupervisor", message: "User Supervisor"})
}
export const isOperator = async (req, res) => {    
    res.status(200).json({app:"auth.isOperator", message: "User operator"})
}

export const isAnybody = async (req, res) => {    
    res.status(200).json({app:"auth.isAnybody", message: "Anybody"})
}