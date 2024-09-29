const getRoutes = require("./get");
const postRoutes = require("./post");
const patchRoutes = require("./patch");
const questionRoutes = {
  parentPath: "/allquestions",
  routes: {
    get : getRoutes,
    post : postRoutes,
    patch : patchRoutes,
  }
};
module.exports = questionRoutes;
