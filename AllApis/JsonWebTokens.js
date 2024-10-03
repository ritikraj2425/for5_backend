require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

class Verification{
    static generateJwt(payload){
        const token = jwt.sign(payload,jwtSecret,{expiresIn:"3d"});
        return token;
    }

    static generateRefreshToken(payload){
        const refresh_token = jwt.sign(payload,refreshSecret,{expiresIn:"7d"})
        return refresh_token;
    }

    static tokenVerification(token,type){
        const secret = type == "jwt" ? jwtSecret : refreshSecret;
        try{
            const payload = jwt.verify(token,secret);
            return payload;
        }
        catch(err){
            return false
        }
    }
    
    static verifyJwt(jwtToken,refreshToken){
        const jwtPayload = this.tokenVerification(jwtToken,"jwt");
        const refreshPayload = this.tokenVerification(refreshToken,"refresh");
        if(jwtPayload && refreshPayload){
            return {
                message:"valid user",
                credentials:{
                    payload : jwtPayload,
                    jwtToken:jwtToken,
                    refreshToken:refreshToken
                }
            }
        }
        if(!jwtPayload && refreshPayload){
            const newPayload = {
                name:refreshPayload.name,
                username:refreshPayload.username,
                email:refreshPayload.email
            }
            const newJwtToken = this.generateJwt(newPayload);
            return {
                message:"valid user",
                credentials:{
                    payload : refreshPayload,
                    jwtToken : newJwtToken,
                    refreshToken:refreshToken
                }
            }
        }
        if(jwtPayload && !refreshPayload){
            const newPayload = {
                name:jwtPayload.name,
                username:jwtPayload.username,
                email:jwtPayload.email
            }
            const newRefreshToken = this.generateJwt(newPayload);
            return {
                message:"valid user",
                credentials:{
                    payload:jwtPayload,
                    jwtToken : jwtToken,
                    refreshToken:newRefreshToken
                }
            }
        }
        return false
    }
}
module.exports = Verification