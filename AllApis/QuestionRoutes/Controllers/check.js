const { UserStatus } = require('../../../Schemas/allSchemas');
const Verification = require('../../JsonWebTokens');

const check = async (req, res) => {
    const question_id = req.params.id;
    const {selected} = req.body;
    const { jwttoken, refreshtoken } = req.headers;

    if(!question_id){
      return res.status(400).json({
        message : "please send the question id in params"
      })
    }
    if(!selected){
      return res.status(400).json({
        message: "please send select option of user"
      })
    }
    const check = Verification.verifyJwt(jwttoken, refreshtoken);
    if(!check){
      return res.status(400).json({
        message : "unauthorized"
      })
    }
    else{
      try{
        const payload = check.credentials.payload;
        const theUser = await UserStatus.findOne({username: payload.username});
        const ans = await Answers.findOne({question_id : question_id});
        const newData = {
          _id : question_id,
          selected : selected , 
          correctAnswer : ans.correctAnswer,
          subject : ans.subject
        }
        
        const checkIfAlreadySolved = theUser.questionSolved.filter(que => que._id = question_id);
        if(checkIfAlreadySolved.length == 0){
          await UserStatus.updateOne(
            { username: payload.username },
            { $addToSet: { questionSolved: newData } }
          );
          await UserStatus.updateOne(
            { username: payload.username },
            { $pull: { questionSolved: question_id } }
          );
        }
        return res.status(200).json({
          result : selected == ans.correctAnswer
        })
      }
      catch(err){
        return res.status(500).json({
          message : "something went wrong"
        })
      }

    }
  }
module.exports = check;