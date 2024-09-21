const questionRoutes = {
    path : "/question",
    routes : [
        {
            method : "get",//get all questions
            path : "/",
            handler : async (req,res)=>{
                res.send("question")
            }
        },
        {
            method : "get",//get single question by id
            path : "/:id",
            handler : async (req,res)=>{
                res.send("question")
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
            path : "/searchedQuestion",// get searched question by query
            handler : async (req,res)=>{
                res.send("question")
            }
        },
        {
            method : "get",
            path : "/:questionBySubject",//by params
            handler : async (req,res)=>{
                res.send("question")
            }
        },
        {
            method : "get",
            path : "/questionByChapter",//by query
            handler : async (req,res)=>{
                res.send("question")
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