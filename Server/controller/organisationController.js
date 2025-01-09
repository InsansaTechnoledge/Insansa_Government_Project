import Authority from "../models/AuthorityModel.js";

export const getLogos = async (req, res) => {
  try {
    const authorityWithOrganizations = await Authority.aggregate([
        { $match: { name: "Central" } },
        {
          $lookup: {
            from: "organizations",
            localField: "organizations",
            foreignField: "name",
            as: "organizationData",
            pipeline: [
                {
                  $project: {
                    _id: 1, // Exclude the _id field
                    name: 1, // Include the name field
                    logo: 1, // Include the logo field
                },
                },
              ],
          },
        },
        {
          $project: {
            _id: 1,
            organizations: "$organizationData",
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
