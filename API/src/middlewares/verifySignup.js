import {ROLES} from '../models/role'
import User from '../models/user';

export const checkRoleExists = (req, res, next) => {
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++){
            if (!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists`
                })
            }
        }
    }
    next();
}

export const checkDuplicate = async (req, res, next) => {
    
    console.log("app: verifySignup, function: checkDuplicate")
    /*
    const user = await User.findOne({username: req.body.username})

    if(user) return res.status(400).json({messaje: "The user already exists"})

    const email = await User.findOne({email: req.body.email})

    if(email) return res.status(400).json({messaje: "The email already exists"})

    next();
    */
}