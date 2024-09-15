const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
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
    constestId: String,
    image: String,
    weightage: Number,
    openedBy: Number,
    solvedBy: Number,
    type: String,
    correctAnswer : String
}, { collection: 'Questions' });

module.exports = {questionSchema};