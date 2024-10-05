const getRoutes = require("./Routes/get");
const homepageRoutes = {
  parentPath: "/homepage",
  routes: {
    get: getRoutes,
  },
};
module.exports = homepageRoutes;
