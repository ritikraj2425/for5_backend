const { HomepageVideoLink } = require("../../Schemas/schemas");
const getRoutes = require("./get");
const homepageRoutes = {
  parentPath: "/homepage",
  routes: {
    get: getRoutes,
  },
};
module.exports = homepageRoutes;
