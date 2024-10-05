const check = require('../Controllers/check')
const postRoutes = [
    {
      path: "/check/:id",
      handler: check,
    }
]
module.exports = postRoutes;