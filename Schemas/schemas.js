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
    correctAnswer : String,
    status : {
        type : String,
        default : "unsolved"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Questions' });
const Question = mongoose.model('Question', questionSchema);

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
    gender:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{collection: 'Users'});
const Users  = mongoose.model('Users',userDetailsSchema);

const videoLinkSchema = new mongoose.Schema({
    VideoId: String,
    section: String,
    link: String
}, { collection: 'HomepageVideos' });
const HomepageVideoLink = mongoose.model('HomepageVideos', videoLinkSchema);

const userStatusSchema = new mongoose.Schema({
    username:String,
    totalPoints: {
        type:Number,
        default : 0
    },
    streak: {
        type:Number,
        default : 0
    },
    QuestionSolved: [Object],
    questionAttempted: [Object],
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
},{collection: 'UserStatus'});
const UserStatus  = mongoose.model('UserStatus',userStatusSchema);

module.exports = {Question,Users,HomepageVideoLink,UserStatus};
