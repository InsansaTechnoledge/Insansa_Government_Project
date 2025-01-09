import mongoose from 'mongoose';
import fetch from 'node-fetch';
if(process.env.NODE_ENV !== "production"){
    (await import('dotenv')).config();
  }
const imageUrl = process.env.DEFAULT_LOGO;
const response = await fetch(imageUrl);
const imageBuffer = await response.buffer();
const base64String = imageBuffer.toString('base64');

console.log(base64String);

const AuthoritySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    logo:{
        type: String,
        default:base64String
    },
    organizations: [
        {
          type: String, 
          required: true
        }
    ],
    type:{
        type: String,
        enum: [ "State_Government", "Central_Government","Multiple_Organizations"],
        required: true,
    }

});

const Authority = mongoose.model('Authority', AuthoritySchema);
export default Authority;