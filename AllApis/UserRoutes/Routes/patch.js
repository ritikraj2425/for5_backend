const updateUserDetails = require('../Controllers/editUserDetails')

const updateRoutes = [
    {
        path : "/edit",
        handler: updateUserDetails
    }
]
module.exports = updateRoutes;