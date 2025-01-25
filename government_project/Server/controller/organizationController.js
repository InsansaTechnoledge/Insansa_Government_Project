import Organization from '../models/OrganizationModel.js';
import Category from '../models/CategoryModel.js';
import Authority from '../models/AuthorityModel.js';
import Event from '../models/EventModel.js';
import EventType from '../models/EventTypeModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname); 

// // Helper function to convert image to base64
export const convertImageToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }
      const base64Image = data.toString('base64');  // Convert buffer to base64 string
      resolve(base64Image);
    });
  });
};



export const createOrganization=async (req,res)=>{
    try{
       const organizations=req.body;
       const saved=[];
       for (let org of organizations){
        const imagePath = path.resolve(__dirname, `../OrganizationLogos/${org.abbreviation}.png`);
        console.log(imagePath);
        let logo=null;
        if (!fs.existsSync(imagePath)) {
          // return res.status(400).json({ error: `Logo not found for ${org.abbreviation}` });}
          console.log("Logo not found for",org.abbreviation);
        }
        else{
          logo = await convertImageToBase64(imagePath);
        }
     

        const parent=await Authority.findOne({name:org.parent_organization});
        if(!parent){
          return res.status(404).json({error:`Parent Authority not found for ${org.name}`});}

        const Orgcategory=await Category.findOne({category:org.category});
        if(!Orgcategory){
          return res.status(404).json({error:`Category not found for ${org.name}`});}
          let organization=await Organization.findOne({abbreviation:org.abbreviation});
          if(organization){
            console.log("Organization already exists",organization);
            return res.status(400).json({error:`Organization already exists`});}
          else{
            if(logo){
         organization=new Organization({
          name:org.name,
          abbreviation:org.abbreviation,
          description:org.description,
          logo:logo,
          category:Orgcategory._id
        });}
        else{
          organization=new Organization({
            name:org.name,
            abbreviation:org.abbreviation,
            description:org.description,
            category:Orgcategory._id
          });
        }
        await organization.save();
        if (!Orgcategory.organizations.includes(organization._id)) {
          Orgcategory.organizations.push(organization._id);
      }
        await Orgcategory.save();
        if (!parent.organizations.includes(organization._id)) {
          parent.organizations.push(organization._id);
      }
        await parent.save();
       }
      }
        res.status(201).json({saved});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

async function processFilesInFolder(folderPath, parentFolderName, type = null) {
      try {
  
          const filesAndFolders = fs.readdirSync(folderPath);
          console.log(`Processing files in ${folderPath}...`);
  
          for (let item of filesAndFolders) {
              const itemPath = path.join(folderPath, item);
              const stats = fs.statSync(itemPath);
  
              if (stats.isDirectory()) {
                  await processFilesInFolder(itemPath, item, type);  
              }
  
              if (stats.isFile() && item.endsWith('.json')) {
                  console.log(`Processing file: ${item}`);
  
  
                  const fileData = JSON.parse(fs.readFileSync(itemPath, 'utf8'));

                  //previous version of the json parsing
                  //
                  // const fileData = await import(pathToFileURL(itemPath).href, {
                  //     assert: { type: 'json' }
                  // });
  
                  // console.log(fileData);
  
                  const organizationName = item.split('.')[0];  
                  const organizationInfo = fileData;  
                  // console.log(organizationInfo);
  
                  let organization = await Organization.findOne({ abbreviation: organizationName });
  
                  // If the organization does not exist, create it
                  if (!organization && parentFolderName==='UPSC') {
                      organization=await Organization.findOne({abbreviation:'UPSC'});
                      };
                      const organization1='';
                  if(organization && parentFolderName==='UPSC'){
                     organization1=await Organization.findOne({abbreviation:'UPSC'});
                  }
                  for(let event of  organizationInfo){
                    console.log(event);
                    const x=await Event.findOne({name:event.name});
                    if(x){
                      // res.status(400).json({error:`Event already exists`});
                      console.log("Event already exists from the :" , organizationName);
                    }
                    else{
                      const newEvent=new Event({
                        name:event.name,
                        date_of_notification:event.date_of_notification,
                        date_of_commencement:event.date_of_commencement,
                        end_date:event.end_date,
                        apply_link:event.apply_link,
                        document_links:event.document_links,
                        details:event.details,
                        organization_id:organization._id,
                        event_type:event.event_type
                      });
                      // console.log(newEvent);
                      
                      await newEvent.save();
                      if (!organization.events.includes(newEvent._id)) {
                        organization.events.push(newEvent._id);
                      
                    }
                    await organization.save();

                    if(organization1 && parentFolderName==='UPSC' && !organization1.events.includes(newEvent._id)){
                      organization1.events.push(newEvent._id);
                      await organization1.save();
                    }
                    
                    let eventType=await EventType.findOne({type:event.event_type});
                    eventType.events.push(newEvent._id); 
                    await eventType.save();
                    }
                     }
                  }
              }
          
      } catch (error) {
          console.error("Error processing files in folder", folderPath, error);
      }
  }
  
  
  export const processOrganizationFiles = async (req, res) => {
      try {
          const formattedDataPath = path.join(__dirname, '../../formatted_data');
  
          const baseDirectories = ['Central', 'States', 'Multiple'];
  
          // Loop through each base folder and process the files
          for (const baseDir of baseDirectories) {
              const folderPath = path.join(formattedDataPath, baseDir);  
  
              console.log(`Processing files in ${baseDir} folder...`);
  
              if (baseDir === 'States') {
                  // Process states subfolders dynamically
                  const stateFolders = fs.readdirSync(folderPath).filter(item => fs.statSync(path.join(folderPath, item)).isDirectory());
                  for (const state of stateFolders) {
                      const stateFolderPath = path.join(folderPath, state);
  
                      console.log(`Processing files in ${state} folder...`);
  
                      await processFilesInFolder(stateFolderPath, state, 'State_Government');
  
                  }
              } 
              else if (baseDir === 'Multiple') {
                  // Process subfolders in the 'multiple' folder dynamically
                  const multipleFolders = fs.readdirSync(folderPath).filter(item => fs.statSync(path.join(folderPath, item)).isDirectory());
                  for (const folder of multipleFolders) {
                      const multipleFolderPath = path.join(folderPath, folder);
                      await processFilesInFolder(multipleFolderPath, folder, 'Multiple_Organizations');
                  }
              } else {
                  console.log(`Processing files in ${baseDir} folder...`, folderPath);
  
                  // Process files in the central folder
                  await processFilesInFolder(folderPath, baseDir, 'Central_Government');
              }
          }
          await EventType.findOneAndUpdate(
            {type:"update"},
            { $set:{lastUpdated:Date.now()}},
            { new: true }
          );
          res.status(200).json({ message: 'Files processed and organizations updated' });
      } catch (error) {
          console.error("Error in processing organization files:", error);
          res.status(500).json({ error: 'Failed to process organization files' });
      }
  };

  export const updateLogos = async (req,res) => {
  const folderPath = path.join(__dirname, '..' , 'OrganizationLogos');  // Folder containing the PNG files
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
        const organizationName = path.basename(file, '.png');  // Extract the organization name from the filename
        const filePath = path.join(folderPath, file);

        // Convert the image to base64
        const base64Image = await convertImageToBase64(filePath);

        // Find the organization by name and update its logo field
        const updatedOrg = await Organization.findOneAndUpdate(
          { abbreviation: organizationName },  // Match the organization by name
          { $set: { logo: base64Image } },  // Set the base64 encoded image in the logo field
          { new: true }  // Return the updated document
        );

        if (updatedOrg) {
          console.log(`Updated logo for ${organizationName}`);
        } else {
          console.log(`Organization ${organizationName} not found.`);
        }
      }

    }
    res.status(200).json({ message: 'Logo updated successfully' });

  });
};


// // Example function to update the organization's logo based on the file name
const updateOrganizationLogo = async (OrganizationName, fileName) => {
  const folderPath = path.join(__dirname, '..', 'OrganizationLogos');
  const filePath = path.join(folderPath, fileName);
const base64Logo = await convertImageToBase64(filePath);  // Get the base64 logo string

// Find the organization by its name and update its logo field
const updatedOrg = await Organization.findOneAndUpdate(
  { abbreviation: OrganizationName },
  { $set: { logo: base64Logo } },
  { new: true }
); 
console.log("last updated",Date.now());
console.log(updatedOrg);
console.log(`Updated logo for ${OrganizationName}`);

};

// // Example usage
updateOrganizationLogo('UPSAD', 'UPSAD.png'); 



  



