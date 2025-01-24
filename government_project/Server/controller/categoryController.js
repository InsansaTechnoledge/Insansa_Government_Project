import Category from '../models/CategoryModel.js'
import Organization from '../models/OrganizationModel.js'
import EventType from '../models/EventTypeModel.js'
import {convertImageToBase64 }from '../controller/organizationController.js'
import fs from 'fs'
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CreateCategory = async (req, res) => {
    try {
      const { names } = req.body;  // names is an array of category names
  
      const categories = [];
  
      for (let name of names) {
        const imagePath = path.resolve(__dirname, `../CategoryLogos/${name}.png`);
        console.log(imagePath);
  
        // Check if the image exists
        if (!fs.existsSync(imagePath)) {
          return res.status(404).json({ message: `${name} image not found` });
        }
  
        // Convert the image to base64
        const logo = await convertImageToBase64(imagePath);
  
        // Check if the category already exists
        let categoryItem = await Category.findOne({ category: name });
  
        if (categoryItem) {
          // If the category exists, update the logo
          categoryItem.logo = logo;
          await categoryItem.save();
        } else {
          // If the category doesn't exist, create a new one
          categoryItem = new Category({
            category: name,
            logo: logo
          });
          await categoryItem.save();
        }
  
        // Push the category object to the response array
        categories.push(categoryItem);
      }
      res.status(201).json(categories);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

export const addOrganizationToCategory = async (req, res) => {
    try {
        const {categoryName,organizationNames} = req.body;

        const category = await Category.findOne({name:categoryName});
        if(!category){
            res.status(404).json({message:`${categoryName} category not found`});
        }
        for(let orgName of organizationNames){
            const organization = await Organization.findOne({name:orgName});
            if(!organization){
                res.status(404).json({message:`${orgName} organization not found`});
            }
            if (!category.Organizations.includes(organization._id)) {
                category.Organizations.push(organization._id);
                organization.Category = category._id;
            }
            organization.Category = category._id;
            await organization.save();
        }
       
        await category.save();

        res.status(201).json({category});
    }catch (error) {
        res.status(409).json({ message: error.message });
    }
}