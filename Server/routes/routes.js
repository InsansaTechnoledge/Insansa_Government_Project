import organizationRoute from './organizationRoutes.js'
import eventRoute from './eventRoutes.js'
import categoryRoute from './categoryRoutes.js'
import searchRoute from './searchRoutes.js'
import contactRoute from './contactRoutes.js'
import stateRoute from './StateRoutes.js'

const routes=(app)=>{

    app.use('/api/organization', organizationRoute);
    app.use('/api/event', eventRoute);
    app.use('/api/category', categoryRoute);
    app.use('/api/search', searchRoute);
    app.use('/api/contact', contactRoute);
    app.use('/api/state', stateRoute)
    
}
export default routes;