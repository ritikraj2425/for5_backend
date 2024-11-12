const authenticationRoutes = require("./AuthenticationRoutes/Authentication");
const questionRoutes = require("./QuestionRoutes/questions");
const homepageRoutes = require("./HomepageRoutes/Homepage");
const userRoutes = require("./UserRoutes/user");
module.exports = [authenticationRoutes,questionRoutes,homepageRoutes,userRoutes]