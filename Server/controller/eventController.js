import Event from '../models/EventModel.js'

export const getLatestUpdates = async (req, res) => {
    try {
        // Calculate date range for last year
        const now = new Date();
        const oneYearAgo = new Date(now.getFullYear(), now.getMonth()-1, now.getDate());

        const exams = await Event.find({
          "date_of_notification": { $gte: oneYearAgo, $lte: now }
        });
    
        // Return the exams to the frontend
        res.status(200).json(exams);
      } catch (error) {
        console.error("Error fetching exams from last year:", error);
        res.status(500).json({ error: "An error occurred while fetching exams." });
      }
};


export const getEvent = async (req, res) => {
  try {

    const { eventId } = req.params;

    const exam = await Event.findById(eventId);

    // Return the exam
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
