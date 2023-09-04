import {Schema, model} from "mongoose"

const changeSchema = new Schema({
    name: {
            type: String,
            unique: true
        },
    type: String,
    description: String,
    status: String,
    observations: String,
},{
    timestamps: true,
    versionKey: false
})

export default model('Change', changeSchema);