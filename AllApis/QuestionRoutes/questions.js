const getRoutes = require("./Routes/get");
const postRoutes = require("./Routes/post");
const patchRoutes = require("./Routes/patch");
const deleteRoutes = require("./Routes/delete");
const questionRoutes = {
  parentPath: "/allquestions",
  routes: {
    get : getRoutes,
    post : postRoutes,
    patch : patchRoutes,
    delete : deleteRoutes,
  }
};
module.exports = questionRoutes;
