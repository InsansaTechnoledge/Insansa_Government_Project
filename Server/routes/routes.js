import organizationRoute from './organizationRoutes.js'
import eventRoute from './eventRoutes.js'
import categoryRoute from './categoryRoutes.js'
import searchRoute from './searchRoutes.js'

const routes=(app)=>{

    app.use('/api/organization', organizationRoute);
    app.use('/api/event', eventRoute);
    app.use('/api/category', categoryRoute);
    app.use('/api/search', searchRoute);
    
}
export default routes;