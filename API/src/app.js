import express from 'express'
import morgan from 'morgan'
//import {createRoles, createInitialUser} from './libs/initialSetup'
import authRoutes from './routes/auth.routes'
import parametersRoutes from './routes/parameters.routes'
import usersRoutes from './routes/users.routes'
import groupsRoutes from './routes/groups.routes'
import product_typesRoutes from './routes/product_types.routes'
import productsRoutes from './routes/products.routes'
import locationsRoutes from './routes/locations.routes'
import buildingsRoutes from './routes/buildings.routes'
import equipmentsRoutes from './routes/equipments.routes'
import areasRoutes from './routes/areas.routes'
import sub_areasRoutes from './routes/sub_areas.routes'
import carriersRoutes from './routes/carriers.routes'
import carrier_typesRoutes from './routes/carrier_types.routes'
import processesRoutes from './routes/processes.routes'
import jobsRoutes from './routes/jobs.routes'
import units_typesRoutes from './routes/unit_types.routes'
import unitsRoutes from './routes/units.routes'
import errorsRoutes from './routes/errors.routes'
import testplansRoutes from './routes/testplans.routes'
import samplesRoutes from './routes/samples.routes'
import oeeUnitsRoutes from './routes/oee_units.routes'
import incidencesRoutes from './routes/incidences.routes'
import processActionsRoutes from './routes/process_actions.routes'
import systemActionsRoutes from './routes/system_actions.routes'

process.env.TZ = 'America/Mexico_City'

const app = express();
//createRoles();
//createInitialUser();

//app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json());
app.set('trust proxy', true);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    //res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Methods", "*");//Solo utilizar en etapa de desarrollo
    next();
});


app.get('/',(req, res) => {
    res.json({
        author: "Jesus Velazquez",
        name: "iBtraceAPI",
        description: "API to Traceability System",
        version: "1.0.0"
    })
})


app.use('/api/areas', areasRoutes)
app.use('/api/auth',authRoutes);
app.use('/api/buildings', buildingsRoutes)
app.use('/api/carriers',carriersRoutes)
app.use('/api/carrier_types', carrier_typesRoutes)
app.use('/api/equipments', equipmentsRoutes)
app.use('/api/errors', errorsRoutes)
app.use('/api/groups', groupsRoutes)
app.use('/api/incidences', incidencesRoutes)
app.use('/api/jobs', jobsRoutes)
app.use('/api/locations', locationsRoutes)
app.use('/api/oee', oeeUnitsRoutes)
app.use('/api/parameters', parametersRoutes)
app.use('/api/process_actions', processActionsRoutes)
app.use('/api/processes', processesRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/product_types', product_typesRoutes)
app.use('/api/samples', samplesRoutes)
app.use('/api/sub_areas', sub_areasRoutes)
app.use('/api/samples', samplesRoutes)
app.use('/api/system_actions', systemActionsRoutes)
app.use('/api/testplans', testplansRoutes)
app.use('/api/units', unitsRoutes)
app.use('/api/unit_types', units_typesRoutes)
app.use('/api/users', usersRoutes)




export default app;