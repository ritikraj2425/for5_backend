const signup = require('../Controllers/signup')
const login = require('../Controllers/login')
const verifyUser = require('../Controllers/verifyUser');

const postRoutes = [
    {
      path: "/signup",
      handler: signup
    },
    {
      path: "/login",
      handler: login
    },
    {
      path: "/verifyUser",
      handler: verifyUser,
    },
  ]
module.exports = postRoutes;