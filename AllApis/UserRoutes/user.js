const getRoutes = require("./Routes/get");
const updateRoutes = require("./Routes/patch");
const userRoutes = {
    parentPath : "/user",
    routes : {
        get : getRoutes,
        patch: updateRoutes
    }

}
module.exports = userRoutes;