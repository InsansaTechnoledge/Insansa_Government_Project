import organizationRoute from './organizationRoutes.js'

const routes=(app)=>{

    app.use('/api/organization', organizationRoute);
    
};
export default routes;