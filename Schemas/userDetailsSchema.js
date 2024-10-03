const userDetails = {
    name:String,
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:String,
    bio: String,
    location:String,
    gender:String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}
module.exports = userDetails;