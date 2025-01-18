import Authority from '../models/AuthorityModel.js'
import Organization from '../models/OrganizationModel.js'

export const getStateByName = async (req, res) => {
    try{

        const {name} = req.params;
        console.log(name);

        const stateData = await Authority.findOne({
            name: name
        });
        
        console.log(stateData);

        const organizationIds = stateData.organizations;
        
        const organizations = await Organization.find({
            _id: {$in: organizationIds}
        },{
            logo:1,
            abbreviation:1
        });

        res.status(201).json({stateData,organizations});
    }
    catch(err){
        console.log(err);
    }
}