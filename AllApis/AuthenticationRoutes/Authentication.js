const postRoutes = require("./post");
const authenticationRoutes = {
    parentPath: "",
    routes: {
      post:postRoutes
    },
};
module.exports = authenticationRoutes;
