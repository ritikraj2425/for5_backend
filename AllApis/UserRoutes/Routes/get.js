const userDetails = require('../Controllers/getUserDetails')

const getRoutes = [
    {
        path : "/details",
        handler: userDetails
    }
]
module.exports = getRoutes;