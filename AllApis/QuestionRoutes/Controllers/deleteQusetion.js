const { Question, UserStatus } = require('../../../Schemas/allSchemas');
const Verification = require('../../JsonWebTokens');

const deleteQuestionById = async (req, res) => {
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
        if(!question){
          return res.status(400).json({
            message : "question with this id does not exists"
          })
        }
        await Question.deleteOne({_id:id});
        return res.status(200).json({
            message : "question deleted successfully"
        })
      } catch (err) {
        res.status(404).json({ message: "Question not found" });
      }
    }
  }
module.exports = deleteQuestionById;