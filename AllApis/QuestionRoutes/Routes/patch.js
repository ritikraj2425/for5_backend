const updateQuestionById = require("../Controllers/updateQuestion");

const deleteRoutes = [
    {
      path: "/updatequestion/:id",
      handler: updateQuestionById 
    }
]
module.exports = deleteRoutes;