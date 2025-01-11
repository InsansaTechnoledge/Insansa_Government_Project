import Organization from '../models/OrganizationModel.js'

export const getLatestUpdates = async (req, res) => {
    try {
        // Calculate date range for last year
        const now = new Date();
        const oneYearAgo = new Date(now.getFullYear(), now.getMonth()-1, now.getDate());

        const exams = await Organization.aggregate([
          {
            // Unwind the information array to process individual exam objects
            $unwind: "$inforamation",
          },
          {
            // Convert string date to Date object, handle null or invalid dates
            $addFields: {
              notificationDate: {
                $cond: {
                  if: {
                    $and: [
                      { $ne: ["$inforamation.date_of_notification", null] },
                      { $ne: ["$inforamation.date_of_notification", ""] }
                    ]
                  },
                  then: {
                    $toDate: {
                      $dateFromString: {
                        dateString: "$inforamation.date_of_notification",
                        format: "%d-%m-%Y",
                        onError: null,
                        onNull: null
                      }
                    }
                  },
                  else: null
                }
              }
            }
          },
          {
            // Match only exams where notificationDate falls within the last year
            $match: {
              notificationDate: {
                $gte: oneYearAgo,
                $lte: now,
              },
            },
          },
          {
            // Project the desired fields
            $project: {
              _id: 0, // Exclude the _id field
              organizationName: "$name", // Include organization name
              examDetails: "$inforamation", // Include exam details
              notificationDate: 1, // Include the notification date
            },
          },
        ]);
    
        // Return the exams to the frontend
        res.status(200).json(exams);
      } catch (error) {
        console.error("Error fetching exams from last year:", error);
        res.status(500).json({ error: "An error occurred while fetching exams." });
      }
};


export const getEvent = async (req, res) => {
  try {
    // Extract organization and examIndex from request parameters
    const { organization, examIndex } = req.params;

    // Find the organization document
    const orgDoc = await Organization.findOne({ name: organization });

    if (!orgDoc) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Check if the examIndex is valid
    if (examIndex < 0 || examIndex >= orgDoc.inforamation.length) {
      return res.status(400).json({ message: "Invalid exam index" });
    }

    // Retrieve the specific exam at the given index
    const exam = orgDoc.inforamation[examIndex];

    // Return the exam
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
