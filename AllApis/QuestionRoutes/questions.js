const getRoutes = require("./Routes/get");
const postRoutes = require("./Routes/post");
const patchRoutes = require("./Routes/patch");
const questionRoutes = {
  parentPath: "/allquestions",
  routes: {
    get : getRoutes,
    post : postRoutes,
    patch : patchRoutes,
  }
};
module.exports = questionRoutes;
