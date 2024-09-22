const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require("./AllApis/AllRoutes");
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
const port = 5000;


mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const {questionSchema}  = require('./Schemas/schemas');
const {userDetailsSchema}  = require('./Schemas/schemas');
const {videoLinkSchema}  = require('./Schemas/schemas');


const Question = mongoose.model('Question', questionSchema);
const HomepageVideoLink = mongoose.model('HomepageVideos', videoLinkSchema);
const Users  = mongoose.model('Users',userDetailsSchema);


routes.forEach((route)=>{
    route.routes.forEach((d)=>{
        app[d.method](route.path + d.path, d.handler);
    })
})


app.get('/api/homepageVideoLink/Featured', async (req, res) => {
    try {
        const linkFeatured = await HomepageVideoLink.find({ section: "featured" });
        console.log(linkFeatured);
        res.json(linkFeatured);
    } catch (err) {
        console.error('Error fetching links', err);
        res.status(500).json({ message: "Error fetching links" })

    }
})


app.get('/api/homepageVideoLink/learn', async (req, res) => {
    try {
        const linkFeatured = await HomepageVideoLink.find({ section: "learn" });
        console.log(linkFeatured);
        res.json(linkFeatured);
    } catch (err) {
        console.error('Error fetching links', err);
        res.status(500).json({ message: "Error fetching links" })

    }
})


app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        console.log(questions);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions' })
    }
});


app.get('/api/questions/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
