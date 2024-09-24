const {Question}  = require('../Schemas/schemas');
const questionRoutes = {
    path : "/question",
    routes : [
        {
            method : "get",//get all questions
            path : "/",
            handler : async (req,res)=>{
                const {search} = req.query;

                try{
                    if(search){
                        const questions = await Question.find({ 
                            questionTitle : { $regex : search, $options: 'i' } 
                        });
                        return res.status(200).json({
                            result:questions
                        })
                    }
                    const questions = await Question.find();
                    return res.status(200).json(questions);
                } catch (error) {
                    res.status(500).json({
                        message:"something went wrong",
                        error : err.message
                    });
                }
            }
        },
        {
            method : "get",//get single question by id
            path : "/:id",
            handler : async (req,res)=>{
                const {id} = req.params;
                try {
                    const question = await Question.findById(id);
                    if (question) {
                        res.json(question);
                    } else {
                        res.status(404).json({ message: 'Question not found' });
                    }
                } catch (err) {
                    res.status(500).json({
                        message:"something went wrong",
                        error : err.message
                    });
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
            path : "/subject/:questionBySubject",//by params
            handler : async (req,res)=>{
                const {questionBySubject} = req.params;
                try{
                    const questions = await Question.find({
                        subject:{ $regex : questionBySubject, $options: 'i' } 
                    })
                    return res.status(200).json({
                        result:questions
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
            method : "get",
            path : "/questionByChapter",//by query
            handler : async (req,res)=>{
                const {chapter} = req.query
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
                        chapters.q = 1
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
            method : "patch",//update a single question
            path : "/:id",
            handler : async (req,res)=>{
                res.send("question")
            }
        },
    ]
}
module.exports = questionRoutes;