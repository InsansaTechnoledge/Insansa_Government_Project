import Authority from "../models/AuthorityModel.js";
import EventType from "../models/EventTypeModel.js";
import {convertImageToBase64 }from '../controller/organizationController.js'
import fs from 'fs'
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createAuthority = async (req, res) => {

try {
    const authority  = req.body;  // names is an array of category names

    const authorities = [];

    for (let x of authority) {
      const imagePath = path.resolve(__dirname, `../AuthorityLogos/${x.name}.png`);
      console.log(imagePath);

      // Check if the image exists
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: `${x.name} image not found` });
      }

      // Convert the image to base64
      const logo = await convertImageToBase64(imagePath);

      // Check if the category already exists
      let body = await Authority.findOne({ name: x.name });

      if (body) {
        // If the category exists, update the logo
        body.logo = logo;
        await body.save();
      } else {
        // If the category doesn't exist, create a new one
        body = new Authority({
          name: x.name,
          logo: logo,
            type: x.type,
        });
        await body.save();
      }

      // Push the category object to the response array
      authorities.push(body);
    }
    res.status(201).json(authorities);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateLogos = async (req,res) => {
  const folderPath = path.join(__dirname, '..' , 'AuthorityLogos');  // Folder containing the PNG files
  console.log(folderPath);

  // Read all the files from the folder
  fs.readdir(folderPath, async (err, files) => {
    console.log(files);
    if (err) {
      console.log('Error reading folder:', err);
      return;
    }

    for (const file of files) {
      if (path.extname(file) === '.png') {
        const authorityName = path.basename(file, '.png');  // Extract the organization name from the filename
        const filePath = path.join(folderPath, file);

        // Convert the image to base64
        const base64Image = await convertImageToBase64(filePath);

        // Find the organization by name and update its logo field
        const updatedauth = await Authority.findOneAndUpdate(
          { name: authorityName },  // Match the organization by name
          { $set: { logo: base64Image } },  // Set the base64 encoded image in the logo field
          { new: true }  // Return the updated document
        );

        if (updatedauth) {
          console.log(`Updated logo for ${authorityName}`);
        } else {
          console.log(`Organization ${authorityName} not found.`);
        }
      }

    }
    res.status(200).json({ message: 'Logo updated successfully' });

  });
};
