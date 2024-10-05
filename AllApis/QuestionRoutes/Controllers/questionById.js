const { Question, UserStatus } = require('../../../Schemas/allSchemas');
const Verification = require('../../JsonWebTokens');

const questionById = async (req, res) => {
    const { id } = req.params;
    const { jwttoken, refreshtoken } = req.headers;
    const check = Verification.verifyJwt(jwttoken, refreshtoken);
    if (!check) {
      return res.status(400).json({
        message: "unauthorized",
      });
    } else {
      try {
        const payload = check.credentials.payload;
        const question = await Question.findById(id);
        if(!question){
          return res.status(400).json({
            message : "question with this id does not exists"
          })
        }
        const theUser = await UserStatus.findOne({username: payload.username});
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
  }
module.exports = questionById;