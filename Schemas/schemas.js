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
const Question = mongoose.model('Question', questionSchema);

const userDetailsSchema = new mongoose.Schema({
    name:String,
    username:type:String,
    email:type:String,
    password:String,
    bio: String,
    location:String,
    gender:String
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
    totalPoints: Number,
    streak: Number,
    QuestionSolved: Number,
    questionAttempted: Number,
    lives: Number,
    todayQuestionSolved: Object,
    contestGiven: Object,
},{collection: 'UserStatus'});
const UserStatus  = mongoose.model('UserStatus',userStatusSchema);

module.exports = {Question,Users,HomepageVideoLink,UserStatus};
