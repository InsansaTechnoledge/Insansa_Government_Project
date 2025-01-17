import Category from '../models/categoryModel.js';
import Organization from '../models/OrganizationModel.js';

export const getCategories = async (req, res) => {
    try{
        const categories = await category.find({},{category:1,logo:1});
        res.json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCategory = async (req, res) => {
    try {
        const category = await category.findOne({ name: req.params.name },{category:1, logo:1});
        res.json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCategoryOrganizations = async (req,res) => {
    try{
        const {category} = req.params;

        
        const categoryData = await Category.findOne({ category: category });
        
        const organizationIds = categoryData.Organizations;

        const organizations = await Organization.find({
            _in: {$in: organizationIds}
        },{
            abbreviation:1,
            logo:1
        });

        res.status(201).json(categoryData,organizations)
    }
    catch(err){
        res.status(400).json({"message": err})
        console.log(err);
    }
}