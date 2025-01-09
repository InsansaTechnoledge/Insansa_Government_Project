import Authority from "../models/AuthorityModel.js";

export const getLogos = async (req, res) => {
  try {
    const authorityWithOrganizations = await Authority.aggregate([
      {
        // Match the authority by name
        $match: { name: "Central" },
      },
      {
        // Unwind the organizations array to allow for easier matching
        $unwind: "$organizations",
      },
      {
        // Lookup the organization data from the Organization collection
        $lookup: {
          from: "organizations", // Name of the Organization collection
          localField: "organizations", // Field in Authority (array of organization names)
          foreignField: "name", // Field in Organization collection to match
          as: "organizationData", // Output field to store matched organization documents
        },
      },
      {
        // Flatten the organizationData array
        $unwind: "$organizationData",
      },
      {
        // Group all matched organization data into a single array
        $group: {
          _id: "$name", // Use the authority's name as the group ID
          organizations: { $push: "$organizationData" }, // Push all organization data into one array
        },
      },
      {
        // Optionally, project the result to exclude _id if you don’t need it
        $project: {
          _id: 1,
          organizations: 1,
        
        },
      },
    ]);

    console.log(authorityWithOrganizations);

    // Return the data to the frontend
    res.status(200).json(authorityWithOrganizations);
  } catch (error) {
    console.error("Error fetching logos:", error);
    res.status(500).json({ error: "An error occurred while fetching logos." });
  }
};
