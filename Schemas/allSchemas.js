const mongoose = require('mongoose');
const answers = require('./answerSchema');
const question = require('./questionSchema');
const userDetails = require('./userDetailsSchema');
const status = require('./userStatusSchema');
const videos = require('./videosSchema');

const questionSchema = new mongoose.Schema(question, { collection: 'Questions' });
const Question = mongoose.model('Question', questionSchema);

const answersSchema = new mongoose.Schema(answers,{collection : "Answers"});
const Answers = mongoose.model("Answers",answersSchema)

const userDetailsSchema = new mongoose.Schema(userDetails,{collection: 'Users'});
const Users  = mongoose.model('Users',userDetailsSchema);

const videoLinkSchema = new mongoose.Schema(videos, { collection: 'HomepageVideos' });
const HomepageVideoLink = mongoose.model('HomepageVideos', videoLinkSchema);

const userStatusSchema = new mongoose.Schema(status,{collection: 'UserStatus'});
const UserStatus  = mongoose.model('UserStatus',userStatusSchema);

module.exports = {Question,Users,HomepageVideoLink,UserStatus,Answers};
