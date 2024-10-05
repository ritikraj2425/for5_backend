const Verification = require('../../JsonWebTokens');

const verifyUser = async (req, res) => {
    const { jwttoken, refreshtoken } = req.headers;
    const check = Verification.verifyJwt(jwttoken, refreshtoken);
    if (check) {
      return res.status(200).json(check);
    }
    return res.status(400).json({
      message: "token expired",
    });
  }
module.exports = verifyUser;