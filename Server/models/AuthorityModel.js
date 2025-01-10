import mongoose from 'mongoose';
if(process.env.NODE_ENV !== "production"){
    (await import('dotenv')).config();
  }

const AuthoritySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
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