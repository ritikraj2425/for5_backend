const { HomepageVideoLink } = require('../../../Schemas/allSchemas');
const featured = async (req, res) => {
    try {
      const linkFeatured = await HomepageVideoLink.find({
        section: "featured",
      });
      res.json(linkFeatured);
    } catch (err) {
      console.error("Error fetching links", err);
      res.status(500).json({ message: "Error fetching links" });
    }
  }
module.exports = featured;