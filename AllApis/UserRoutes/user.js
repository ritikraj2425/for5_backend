const getRoutes = require("./Routes/get");
const userRoutes = {
    parentPath : "/user",
    routes : {
        get : getRoutes
    }
}
module.exports = userRoutes;