import {Schema, model} from "mongoose"
import bcrypt from 'bcryptjs'


const userSchema = new Schema(
    {
        usr_name: {
            type: String,
            unique: true,
            required:true
        },
        usr_full_name: {
            type: String,
            unique: true,
            required:true
        },
        usr_email: {
            type: String,
            required:true
        },
        usr_password: {
            type: String,
            required:true
        },
        usr_grp_id: {
            type: Number,
            required:true
        },

    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model ('User',userSchema);