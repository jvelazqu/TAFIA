import Role from '../models/role'
import User from '../models/user'

export const createRoles = async () => {
    try {
        
        const count = await Role.estimatedDocumentCount()
     
        if (count > 0) return;

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'operator'}).save(),
            new Role({name: 'supervisor'}).save(),
            new Role({name: 'manager'}).save(),
            new Role({name: 'director'}).save(),
            new Role({name: 'administrator'}).save()
        ])

        console.log(values)
    } catch(error){
        console.error(error);
    }
}


export const createInitialUser = async () => {

    console.log('app: initialSetup, function: createInitialUser')
    /*
    try {
        const count = await User.estimatedDocumentCount()
        if (count > 0) return;

        const role = await Role.findOne({name: "administrator"})
        console.log(role)

        const values = await Promise.all([
            //newUser.save()      
            new User({
                name: 'User admin',
                email: 'jjvema@gmail.com',
                password: await User.encryptPassword('123qwe'),
                roles: [role.id]
            }).save()  
        ])

        console.log(values)
    } catch(error){
        console.error(error);
    }
    */
}
