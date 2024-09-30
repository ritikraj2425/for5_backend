const getRoutes = require("./get");
const homepageRoutes = {
  parentPath: "/homepage",
  routes: {
    get: getRoutes,
  },
};
module.exports = homepageRoutes;
