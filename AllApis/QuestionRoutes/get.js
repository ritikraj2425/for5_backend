const { Question, UserStatus } = require("../../Schemas/allSchemas");
const Verification = require('../JsonWebTokens');
const getRoutes = [
    {
      path: "/",//get all questions
      handler: async (req, res) => {
        const { subject, search, chapter, page, limit, difficulty, status } = req.query;
        const { jwttoken, refreshtoken } = req.headers;

        const check = Verification.verifyJwt(jwttoken, refreshtoken);
        const queryToFilter = {
          ...(search && { questionTitle: { $regex: search, $options: "i" }}),
          ...(chapter && {chapter: { $regex: `^${chapter}$`, $options: "i" }}),
          ...(subject && {subject: { $regex: `^${subject}$`, $options: "i" }}),
          ...(difficulty && {difficulty: { $regex: `^${difficulty}$`, $options: "i" }}),
        };
        if (!check) {
          try {
            const questions = await Question.find(queryToFilter).skip((page - 1) * limit).limit(limit);
            return res.status(200).json({
              result: questions,
            });
          } catch (err) {
            return res.status(500).json({
              message:"something went wrong in allQuestions api logged-out user",
            });
          }
        } else {
          try {
            const payload = check.credentials.payload;
            const theUser = await UserStatus.findOne({username: payload.username});
            const questions = await Question.find({
              ...queryToFilter,
              ...(status && {status: { $regex: `^${status}$`, $options: "i" }}),
            }).skip((page - 1) * limit).limit(limit);
            const finalQuestions = questions.map((que) => {
                theUser.questionSolved.forEach((status)=>{
                    if(que._id == status._id){
                        que.selected = status.selected;
                        que.correctAnswer = status.correctAnswer;
                        que.status = "solved";
                    }
                })
                theUser.questionAttempted.forEach((status)=>{
                    if(que._id == status._id){
                        que.status = "attempted";
                    }
                })
                return que;
            });
            return res.status(200).json({
              username: payload.username,
              result: finalQuestions,
            });
          } catch (err) {
            return res.status(500).json({
              message:
                "something went wrong in allQuestions api logged-in user",
            });
          }
        }
      },
    },
    {
      path: "/question/:id",
      handler: async (req, res) => {
        const { id } = req.params;
        const { jwttoken, refreshtoken } = req.headers;
        const check = Verification.verifyJwt(jwttoken, refreshtoken);
        if (!check) {
          return res.status(400).json({
            message: "unauthorized",
          });
        } else {
          try {
            const question = await Question.findById(id);
            const payload = check.credentials.payload;
            const theUser = await UserStatus.findOne({
              username: payload.username,
            });
            const isQuestionSolved = theUser.questionSolved.filter((que)=>que._id == id);
            if(isQuestionSolved.length != 0){ 
                question.selected = isQuestionSolved[0].selected;
                question.correctAnswer = isQuestionSolved[0].correctAnswer;
                question.status = "solved";
                
            }
            else{
                await UserStatus.updateOne(
                  { username: payload.username },
                  { $addToSet: { questionAttempted: id } }
                );
            }
            
            res.status(200).json({
              message: "success",
              result: question,
            });
          } catch (err) {
            res.status(404).json({ message: "Question not found" });
          }
        }
      },
    },
    {
      path: "/randomQustion",
      handler: async (req, res) => {
        res.send("question");
      },
    },
    {
      path: "/chapterList/:subject",
      handler: async (req, res) => {
        const { subject } = req.params;
        try {
          const questions = await Question.find({
            subject: { $regex: subject, $options: "i" },
          });
          const chapters = {};
          questions.map((q) => {
            chapters[q.chapter] = 1;
          });
          return res.status(200).json({
            result: Object.keys(chapters),
          });
        } catch (err) {
          return res.status(500).json({
            message: "something went wrong",
            error: err.message,
          });
        }
      },
    },
]
module.exports = getRoutes;