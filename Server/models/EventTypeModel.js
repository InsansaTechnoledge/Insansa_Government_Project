import e from "express";
import mongoose from "mongoose";

const EventTypeSchema = new mongoose.Schema({
    type:{
        type: String,
        enum:["Exam","AdmitCard","Result"],
        required: true
    },
    events:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

const EventType = mongoose.model('EventType', EventTypeSchema);
export default EventType;