const postRoutes = require("./Routes/post");
const authenticationRoutes = {
    parentPath: "",
    routes: {
      post:postRoutes
    },
};
module.exports = authenticationRoutes;
