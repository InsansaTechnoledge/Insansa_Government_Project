import EventType from "../models/EventTypeModel.js";
export const createEventType=async(req,res)=>{
    try{
        const eventTypes=req.body;
        const eventTypesArray=[];
        for(let eventType of eventTypes){
            const x=await EventType.findOne({type:eventType});
            if(x){
                eventTypesArray.push(x);
                x.lastUpdated=Date.now();
                continue;
            }
            else{
            const newEventType=new EventType({
                type:eventType
            });
            await newEventType.save();
            eventTypesArray.push(newEventType);
        }
        }
        res.status(201).json(eventTypesArray);

    }catch(error){
        res.status(409).json({message:error.message});
    }
}