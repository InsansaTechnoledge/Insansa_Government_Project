import mongoose from 'mongoose';

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