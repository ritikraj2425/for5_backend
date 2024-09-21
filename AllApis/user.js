const userRoutes = {
    path : "/user",
    routes : [
        {
            method : "get",
            path : "/:id",
            handler : async (req,res)=>{
                res.send("user")
            }
        },
        {
            method : "post",
            path : "/",
            handler : async (req,res)=>{
                res.send("user")
            }
        },
        {
            method : "patch",
            path : "/:id",
            handler : async (req,res)=>{
                res.send("user")
            }
        },
        {
            method : "get",
            path : "/status/:id",
            handler : async (req,res)=>{
                res.send("user")
            }
        },
        {
            method : "patch",
            path : "/status/:id",
            handler : async (req,res)=>{
                res.send("user")
            }
        },
    ]
}
module.exports = userRoutes;