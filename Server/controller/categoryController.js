import Category from '../models/categoryModel.js';
import category from '../models/categoryModel.js'

export const getCategories = async (req, res) => {
    try{
        const categories = await category.find();
        res.json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCategory = async (req, res) => {
    try {
        const category = await category.findOne({ name: req.params.name });
        res.json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCategoryOrganizations = async (req,res) => {
    try{
        const {category} = req.params;

        
        const categoryData = await Category.findOne({ name: category }).populate('Organizations');
        res.status(201).json(categoryData)
    }
    catch(err){
        res.status(400).json({"message": err})
        console.log(err);
    }
}