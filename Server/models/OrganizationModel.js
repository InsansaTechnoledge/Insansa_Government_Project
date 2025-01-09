import fetch from 'node-fetch';

import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const imageUrl = process.env.DEFAULT_LOGO;
const response = await fetch(imageUrl);
const imageBuffer = await response.buffer();
const base64String = imageBuffer.toString('base64');

const organizationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    fullName:{
        type: String
    },
    logo:{
        type: String,
        default:base64String
    },
    inforamation:[{
        type:Object,
    }],
    // related_organization:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"organization"
    // }],
    related_organization:[{
        type: String,
    }],
    parentAuthority:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Authority"
    }
    
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;