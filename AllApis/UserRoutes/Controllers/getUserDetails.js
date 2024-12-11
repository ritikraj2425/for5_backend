const { Users, UserStatus } = require('../../../Schemas/allSchemas');
const Verification = require('../../JsonWebTokens');

const userDetails = async (req, res) => {
    const { jwttoken, refreshtoken } = req.headers;
    const check = Verification.verifyJwt(jwttoken, refreshtoken);
    if(!check){
        return res.status(400).json({
            message : "unauthorized"
        })
    }
    else{
        try{
            const payload = check.credentials.payload;
            const user = await Users.findOne({username : payload.username});
            const status = await UserStatus.findOne({username: payload.username});
            const totalSolved = status.questionSolved.length;
            let physicsCount = 0;
            let chemistryCount = 0;
            let mathsCount = 0;
            status.questionSolved.map((que)=>{
                switch(que.subject){
                    case("Physics"):physicsCount++;
                    case("Chemistry"):chemistryCount++;
                    case("Mathematics"):mathsCount++;
                }
            })
            return res.status(200).json({
                name:user.name,
                username: user.username,
                bio : user.bio,
                location : user.location,
                gender : user.gender,
                totalQuestionSolved : totalSolved,
                physicsCount : physicsCount,
                chemistryCount : chemistryCount,
                mathsCount : mathsCount
            })
        }
        catch(err){
            return res.status(500).json({
                message : "something went wrong while getting user details"
            })
        }
    }
}
module.exports = userDetails;