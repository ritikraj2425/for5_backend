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

const userDetailsSchema = new mongoose.Schema({
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
    gender:String
},{collection: 'Users'});

const videoLinkSchema = new mongoose.Schema({
    VideoId: String,
    section: String,
    link: String
}, { collection: 'HomepageVideos' });

const userStatusSchema = new mongoose.Schema({
    username:String,
    totalPoints: Number,
    streak: Number,
    QuestionSolved: Number,
    questionAttempted: Number,
    lives: Number,
    todayQuestionSolved: Object,
    contestGiven: Object,
},{collection: 'UserStatus'});

module.exports = {questionSchema,userDetailsSchema,videoLinkSchema,userStatusSchema};