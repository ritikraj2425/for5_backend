const { HomepageVideoLink } = require('../../../Schemas/allSchemas');
const learn = async (req, res) => {
    try {
      const linkFeatured = await HomepageVideoLink.find({
        section: "learn",
      });
      res.json(linkFeatured);
    } catch (err) {
      console.error("Error fetching links", err);
      res.status(500).json({ message: "Error fetching links" });
    }
  }
module.exports = learn;