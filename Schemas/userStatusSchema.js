const userStatus = {
    username:String,
    totalPoints: {
        type:Number,
        default : 0
    },
    streak: {
        type:Number,
        default : 0
    },
    questionSolved: [Object],    //{_id, selected, correctAnswer}
    questionAttempted: [Object], //[id]
    lives: {
        type:Number,
        default : 0
    },
    todayQuestionSolved: Object,
    contestGiven: Object,
    createdAt: {
        type: Date,
        default: Date.now
    }
}
module.exports = userStatus;