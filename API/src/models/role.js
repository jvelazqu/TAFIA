import {Schema, model} from 'mongoose'

export const ROLES = ['user','operator','supervisor','manager','director','administrator']

const rolSchema = new Schema({
    name: String
},{
    versionKey: false
})

export default model('Role', rolSchema);