import organizationRoute from './organizationRoutes.js'
import eventRoute from './eventRoutes.js'
import categoryRoute from './categoryRoutes.js'

const routes=(app)=>{

    app.use('/api/organization', organizationRoute);
    app.use('/api/event', eventRoute)
    app.use('/api/category', categoryRoute)
}
export default routes;