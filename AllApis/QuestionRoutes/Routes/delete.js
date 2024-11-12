const deleteQuestionById = require("../Controllers/deleteQusetion")

const deleteRoutes = [
    {
      path: "/removequestion/:id",
      handler: deleteQuestionById 
    }
]
module.exports = deleteRoutes;