import organisationRoute from './organisationRoutes.js'

const routes=(app)=>{

    app.use('/api/organisation', organisationRoute);
    
};
export default routes;