const allQuestions = require('../Controllers/allQuestions');
const chapterList = require('../Controllers/chapterList');
const questionById = require('../Controllers/questionById');

const getRoutes = [
    {
      path: "/",
      handler: allQuestions 
    },
    {
      path: "/question/:id",
      handler: questionById 
    },
    {
      path: "/chapterList/:subject",
      handler: chapterList 
    }
]
module.exports = getRoutes;