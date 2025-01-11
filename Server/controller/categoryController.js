import category from '../models/categoryModel.js'

export const getCategories = async (req, res) => {
    try{
        const categories = await category.find();
        console.log("category",categories);
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