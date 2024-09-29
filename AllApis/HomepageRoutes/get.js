const { HomepageVideoLink } = require("../../Schemas/schemas");
const getRoutes = [
    {
      path: "/featured",
      handler: async (req, res) => {
        try {
          const linkFeatured = await HomepageVideoLink.find({
            section: "featured",
          });
          res.json(linkFeatured);
        } catch (err) {
          console.error("Error fetching links", err);
          res.status(500).json({ message: "Error fetching links" });
        }
      },
    },
    {
      path: "/learn",
      handler: async (req, res) => {
        try {
          const linkFeatured = await HomepageVideoLink.find({
            section: "learn",
          });
          res.json(linkFeatured);
        } catch (err) {
          console.error("Error fetching links", err);
          res.status(500).json({ message: "Error fetching links" });
        }
      },
    },
  ]
module.exports = getRoutes;