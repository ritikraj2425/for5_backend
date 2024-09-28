const {Question, UserStatus}  = require('../Schemas/schemas');
const {verifyJwt} = require("./Middlewares");
const questionRoutes = {
    path : "/allquestions",
    routes : [
        {
            method : "get",//get all questions
            path : "/",
            handler : async (req,res)=>{
                const {search,chapter,page,limit,difficulty,status} = req.query;
                const {subject} = req.body;
                const {jwttoken,refreshtoken} = req.headers;
                const check = verifyJwt(jwttoken,refreshtoken);
                const queryToFilter = {
                    ...(search && {questionTitle : {$regex : search, $options: 'i' }}),
                    ...(chapter && {chapter : {$regex : `^${chapter}$`, $options: 'i' }}),
                    ...(subject && {subject : {$regex : `^${subject}$`, $options: 'i' }}),
                    ...(difficulty && {difficulty : {$regex : `^${difficulty}$`, $options: 'i' }}),
                }
                if(!check){
                    try{
                        const questions = await Question.find(queryToFilter).skip((page-1)*limit).limit(limit);
                        return res.status(200).json({
                            result:questions
                        })
                    }
                    catch(err){
                        return res.status(500).json({
                            message:"something went wrong in allQuestions api logged-out user"
                        })
                    }
                }
                else{
                    try{
                        const payload = check.credentials.payload;
                        const theUser = await UserStatus.findOne({username:payload.username});
                        const questions = await Question.find({
                            ...queryToFilter,
                            ...(status && {status : {$regex : `^${status}$`, $options: 'i' }})
                        }).skip((page-1)*limit).limit(limit);
                        const finalQuestions = questions.map((que)=>{
                            if(theUser.QuestionSolved.includes(que._id)){
                                que.status = "solved"
                            }
                            else if(theUser.questionAttempted.includes(que._id)){
                                que.status = "attempted"
                            }
                            return que
                        })
                        return res.status(200).json({
                            username:payload.username,
                            result:finalQuestions
                        })
                    }
                    catch(err){
                        return res.status(500).json({
                            message :"something went wrong in allQuestions api logged-in user"
                        })
                    }


                }
            }
        },
        {
            method : "get",//get single question by id
            path : "/question/:id",
            handler : async (req,res)=>{
                const {id} = req.params;
                const {jwttoken,refreshtoken} = req.headers;
                const check = verifyJwt(jwttoken,refreshtoken);
                if(!check){
                    return res.status(400).json({
                        message:"unauthorized"
                    })
                }
                else{
                    try {
                        const question = await Question.findById(id);
                        const payload = check.credentials.payload;
                        const theUser = await UserStatus.findOne({username:payload.username});
                        const attempted = theUser.questionAttempted;
                        if(!attempted.includes(question._id)){
                            attempted.push(question._id);
                            await UserStatus.updateOne(
                                {username:payload.username},
                                { $set: { questionAttempted: attempted } } 
                            )
                        }
                        res.status(200).json({
                            message:"success",
                            result:question
                        });
                    } catch (err) {
                        res.status(404).json({ message: 'Question not found' });
                    }
                }
            }
        },
        {
            method : "get",//get random questions
            path : "/randomQustion",
            handler : async (req,res)=>{
                res.send("question")
            }
        },
        {
            method : "get",
            path : "/chapterList",
            handler : async (req,res)=>{
                const {subject} = req.body;
                try{
                    const questions = await Question.find({
                        subject:{ $regex : subject, $options: 'i' } 
                    })
                    const chapters = {}
                    questions.map((q)=>{
                        chapters[q.chapter] = 1
                    })
                    return res.status(200).json({
                        result:Object.keys(chapters)
                    })
                }
                catch(err){
                    return res.status(500).json({
                        message:"something went wrong",
                        error : err.message
                    })
                }

            }
        },
        {
            method : "post",//for admins when posting a question
            path : "/",
            handler : async (req,res)=>{
                res.send("question")
            }
        },
        {
            method : "patch",//for admins to update a single question
            path : "/:id",
            handler : async (req,res)=>{
                res.send("question")
            }
        },
    ]
}
module.exports = questionRoutes;