export const search = async (req, res) => {
    try {
      const { query } = req.params;
  
      // Validate that query is provided
      if (!query) {
        return res.status(400).json({ message: "Search query is required." });
      }
  
      // Perform searches in all collections
      const authorizationResults = await db
        .collection("authorizations")
        .find({ $text: { $search: query } })
        .toArray();
      const organizationResults = await db
        .collection("organizations")
        .find({ $text: { $search: query } })
        .toArray();
      const categoryResults = await db
        .collection("categories")
        .find({ $text: { $search: query } })
        .toArray();
  
      // Combine results from all collections
      const combinedResults = [
        ...authorizationResults,
        ...organizationResults,
        ...categoryResults,
      ];
  
      // Log and respond with results
      console.log(combinedResults);
      res.status(200).json(combinedResults);
    } catch (err) {
      console.error("Error during search:", err);
      res.status(500).json({ message: "An error occurred during search." });
    }
  };
  