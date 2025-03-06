const { Users } = require('../../../Schemas/allSchemas');
const Verification = require('../../JsonWebTokens');

const updateUserDetails = async (req, res) => {

    const { jwttoken, refreshtoken } = req.headers;
    const {bio,location,gender,name} = req.body;
    const check = Verification.verifyJwt(jwttoken, refreshtoken);
    if (!check) {
        return res.status(401).json({
            message: "You are not authorized to access this api"
        });
    } else {
        try {
            const payload = check.credentials.payload;
            const user = await Users.findOne({ username: payload.username });
            if (user) {
                user.bio = bio || user.bio;
                user.location = location || user.location;
                user.gender = gender || user.gender;
                user.name = name || user.name;
                user.createdAt = Date.now();
                await user.save();
                return res.status(200).json({
                    message: "User details updated successfully"
                });
            } else {
                return res.status(404).json({
                    message: "User not found"
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: "something went wrong in updateUserDetails api"
            });
        }
    }
}

module.exports = updateUserDetails;