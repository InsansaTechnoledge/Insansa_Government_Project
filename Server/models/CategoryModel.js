import mongoose from "mongoose";
if(process.env.NODE_ENV !== "production"){
    (await import('dotenv')).config();
  }
import fetch from 'node-fetch';
const imageUrl = process.env.DEFAULT_LOGO;
const response = await fetch(imageUrl);
const imageBuffer = await response.buffer();
const base64String = imageBuffer.toString('base64');

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    logo:{
        type: String,
        default:base64String
    },
    Organizations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        }
    ]
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;