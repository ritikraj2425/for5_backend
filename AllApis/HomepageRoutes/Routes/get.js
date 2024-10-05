const featured = require('../Controllers/featured');
const learn = require('../Controllers/learn');
const getRoutes = [
    {
      path: "/featured",
      handler: featured
    },
    {
      path: "/learn",
      handler: learn
    },
  ]
module.exports = getRoutes;