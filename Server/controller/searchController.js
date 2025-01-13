import mongoose from "mongoose";

export const search = async (req, res) => {
  try {
    const { query } = req.params;

    // Validate that query is provided
    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    // Retrieve the database instance
    const db = mongoose.connection.db;

    // Perform searches in all collections
    const authorities = await db
      .collection("authorities")
      .find({ $text: { $search: query } })
      .toArray();
    const organizations = await db
      .collection("organizations")
      .find({ $text: { $search: query } })
      .toArray();
    const categories = await db
      .collection("categories")
      .find({ $text: { $search: query } })
      .toArray();

    // Return results as separate arrays
    const result = {
      authorities,
      organizations,
      categories,
    };

    // Log and respond with results
    res.status(200).json(result);
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ message: "An error occurred during search." });
  }
};
