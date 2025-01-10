import organisationRoute from './organisationRoutes.js'
import eventRoute from './eventRoutes.js'

const routes=(app)=>{

    app.use('/api/organization', organizationRoute);
    app.use('/api/event', eventRoute)
}
export default routes;