const questions = {
    id : String,
    subject: String,
    chapter: String,
    topic: String,
    questionTitle: String,
    question: String,
    class: String,
    difficulty: String,
    year: Number,
    options: [Object],
    selected : String,
    correctAnswer : String,
    constestId: String,
    image: String,
    weightage: Number,
    openedBy: Number,
    solvedBy: Number,
    type: String,
    status : {
        type : String,
        default : "unsolved"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
module.exports = questions;