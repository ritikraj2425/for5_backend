const bcrypt = require("bcrypt");
require("dotenv").config();
const Verification = require("../../JsonWebTokens");
const { Users, UserStatus } = require('../../../Schemas/allSchemas');
const Validator = require('../../Validator');
const saltRounds = 10;


const signup = async (req,res)=>{
    const { name, username, email, password } = req.body;
    const reqMustHave = {
        name : name,
        username : username,
        email : email,
        password : password
    }
    const validate = Validator.validateInput(reqMustHave);
    if(!validate.isInputValid){
        return res.status(400).json({
            message : validate.msg
        })
    }
    try {
      const checkUsernameAndEmail = await Users.findOne({
        username: username,
        email: email,
      });
      if (checkUsernameAndEmail) {
        res
          .status(400)
          .send({ message: "username and email already exists" });
        return;
      }


      const checkUsername = await Users.findOne({ username: username });
      if (checkUsername) {
        res.status(400).send({ message: "username already exists" });
        return;
      }


      const checkEmail = await Users.findOne({ email: email });
      if (checkEmail) {
        res.status(400).send({ message: "email is already registered" });
        return;
      }


      const hash = await bcrypt.hash(password, saltRounds);
      const user = new Users({
        ...req.body,
        password: hash,
      });
      await user.save();
      const statusOfUser = new UserStatus({
        username: username
      });
      await statusOfUser.save();


      const payload = { name, username, email };
      const token = Verification.generateJwt(payload);
      const refreshToken = Verification.generateRefreshToken(payload);
      res.status(200).send({
        message: "success",
        jwtToken: token,
        refreshToken: refreshToken,
      });
      return;
    } catch (e) {
      res.status(500).send({ message: "something went wrong while signing up" });
    }
  }
module.exports = signup;