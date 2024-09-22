const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
dotenv.config(); 
const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;
const {userDetailsSchema}  = require('../Schemas/schemas');
const Users  = mongoose.model('Users',userDetailsSchema);
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
                    })
                }
                const checkUsernameAndEmail  = await Users.findOne({username: username,email:email});
                if(checkUsernameAndEmail){
                    res.status(400).send({message:"username and email already exist"})
                }
                const checkUsername  = await Users.findOne({username: username});
                if(checkUsername){
                    res.status(400).send({message:"username already exist"})
                }
                const checkEmail  = await Users.findOne({username: username});
                if(checkEmail){
                    res.status(400).send({message:"email is already registered"})
                }
                try{
                    const hash = await bcrypt.hash(password,10);
                    const user = new Users({
                        ...req.body,
                        password : hash
                    });
                    await user.save();
                    const payload = {name,username,email};
                    const token = jwt.sign(payload,jwtSecret,{expiresIn:"24h"});
                    const refresh_token = jwt.sign(payload,refreshSecret, {expiresIn:"7d"});
                    res.status(200).send({
                        message:"success",
                        token:token,
                        refresh_token:refresh_token
                    })

                }
                catch(e){
                    console.log(e);
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
                }
                try{
                    let user;
                    if(!username){
                        user = await Users.findOne({email:email});
                        if(!user){
                            res.status(404).send({message:"User with this email does not exist"});
                        }
                    }
                    else if(!email){
                        user = await Users.findOne({username:username});
                        if(!user){
                            res.status(404).send({message:"User with this username does not exist"});
                        }
                    }
                    const checkPassword = await bcrypt.compare(password, user.password);
                    if(!checkPassword){
                        res.status(400).send({message:"Wrong password"});
                    }
                    const payload = {
                        name:user.name,
                        username:user.username,
                        email:user.email
                    };
                    const token = jwt.sign(payload,jwtSecret,{expiresIn:"24h"});
                    const refresh_token = jwt.sign(payload,refreshSecret, {expiresIn:"7d"});
                    res.status(200).send({
                        message:"login successfull",
                        token:token,
                        refresh_token:refresh_token
                    })
                }
                catch(e){
                    res.status(500).send({message:"something went wrong"});
                }
            }
        }
        
    ]
}
module.exports = AuthenticationRoutes;