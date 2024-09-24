const bcrypt = require("bcrypt");
require('dotenv').config();
const {generateJwt} = require("./Middlewares");
const {Users}  = require('../Schemas/schemas');
const AuthenticationRoutes = {
    path : "",
    routes : [
        {
            method : "post",
            path : "/signup",
            handler : async (req,res)=>{
                const{name,username,email,password} = req.body;
                if(!name || !username || !email || !password){
                    res.status(400).send({
                        message:"all fields are required"
                    });
                    return;
                }
                try{
                    const checkUsernameAndEmail  = await Users.findOne({username: username,email:email});
                    if(checkUsernameAndEmail){
                        res.status(400).send({message:"username and email already exist"});
                        return;
                    }
                    const checkUsername  = await Users.findOne({username: username});
                    if(checkUsername){
                        res.status(400).send({message:"username already exist"});
                        return;
                    }
                    const checkEmail  = await Users.findOne({email: email});
                    if(checkEmail){
                        res.status(400).send({message:"email is already registered"});
                        return;
                    }
                    const hash = await bcrypt.hash(password,10);
                    const user = new Users({
                        ...req.body,
                        password : hash
                    });
                    await user.save();
                    const payload = {name,username,email};
                    const tokens = generateJwt(payload);
                    res.status(200).send({
                        message:"success",
                        token:tokens.token,
                        refresh_token:tokens.refresh_token
                    });
                    return;

                }
                catch(e){
                    res.status(500).send({message:"something went wrong"});
                }
            }
        },
        {
            method : "post",
            path : "/login",
            handler : async (req,res)=>{
                const{username, email, password} = req.body;
                if(!password || (!email && !username)){
                    res.status(400).send({message:"all fields are required"});
                    return;
                }
                try{
                    let user;
                    if(!username){
                        user = await Users.findOne({email:email});
                        if(!user){
                            res.status(404).send({message:"User with this email does not exist"});
                            return;
                        }
                    }
                    else if(!email || (!(!email) && !(!username))){
                        user = await Users.findOne({username:username});
                        if(!user){
                            res.status(404).send({message:"User with this username does not exist"});
                            return;
                        }
                    }

                    const checkPassword = await bcrypt.compare(password, user.password);
                    if(!checkPassword){
                        res.status(400).send({message:"Wrong password"});
                        return;
                    }
                    const payload = {
                        name:user.name,
                        username:user.username,
                        email:user.email
                    };
                    const tokens = generateJwt(payload);
                    res.status(200).send({
                        message:"login successfull",
                        token:tokens.token,
                        refresh_token:tokens.refresh_token
                    });
                    return;
                }
                catch(e){
                    res.status(500).send({message:"something went wrong"});
                }
            }
        }
    ]
}
module.exports = AuthenticationRoutes;


