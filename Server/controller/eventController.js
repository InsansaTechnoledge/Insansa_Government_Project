import Event from '../models/EventModel.js'

export const getLatestUpdates = async (req, res) => {
    try {
        // Calculate date range for last year
        const now = new Date();
        const oneYearAgo = new Date(now.getFullYear()-1, now.getMonth(), now.getDate());

        const exams = await Event.aggregate([
          {
            $addFields: {
              parsedDate: {
                $cond: {
                  if: {
                    $and: [
                      { $ne: ["$date_of_notification", null] },
                      { $ne: ["$date_of_notification", ""] }
                    ]
                  },
                  then: {
                    $dateFromString: {
                      dateString: "$date_of_notification",
                      format: "%d-%m-%Y",
                      onError: null,
                      onNull: null
                    }
                  },
                  else: null
                }
              }
            }
          },
          {
            $match: {
              parsedDate: { $gte: oneYearAgo, $lte: now }
            }
          },
          {
            $lookup: {
              from: "organizations", // The name of the organization collection
              localField: "organization_id", // The field in the Event document that references the Organization
              foreignField: "_id", // The field in the Organization collection that is referenced (usually _id)
              as: "organizationDetails" // The field in the output that will contain the organization data
            }
          },
          {
            $unwind: "$organizationDetails" // To flatten the organizationDetails array into a single object
          },
          {
            $project: {
              _id: 1,
              name: 1, // Event name or other fields you want to include
              date_of_notification: 1,
              apply_link: 1,
              organizationName: "$organizationDetails.abbreviation" // Including the organization name
            }
          }
        ]);
        

        console.log(exams);
        res.status(201).json(exams);
      }
      catch(err){
        console.log(err);
      }
};


export const getEvent = async (req, res) => {
  try {

    const { eventId } = req.params;

    const exam = await Event.findOne({
      _id:eventId}
    );

    // Return the exam
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
