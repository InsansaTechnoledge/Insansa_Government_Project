import organisationRoute from './organisationRoutes.js'
import eventRoute from './eventRoutes.js'

const routes=(app)=>{

    app.use('/api/organisation', organisationRoute);
    app.use('/api/event', eventRoute)
};
export default routes;