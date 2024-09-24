require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

function generateJwt(payload){
    const token = jwt.sign(payload,jwtSecret,{expiresIn:"24h"});
    const refresh_token = jwt.sign(payload,refreshSecret, {expiresIn:"7d"});
    return {
        token : token,
        refresh_token : refresh_token
    }
}

function jwtVerification(jwtToken, refreshToken){
    try{
        const payload = jwt.verify(jwtToken,jwtSecret)
        return {
            payload:payload,
            type:"jwtToken"
        }
    }
    catch(er){
        try{
            const payload = jwt.verify(refreshToken,refreshSecret)
            return {
                payload:payload,
                type:"refreshToken"
            }
        }
        catch(err){
            return false
        }
    }
}
module.exports = {generateJwt,jwtVerification}