const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require("./AllApis/AllRoutes");
const {Question,HomepageVideoLink,UserStatus}  = require('./Schemas/schemas');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const mongoURI = process.env.MONGO_URI;
const port = 5000;


mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });




const secretApiKey = process.env.API_KEY;

routes.forEach((route)=>{
    route.routes.forEach((d)=>{
        app[d.method](route.path + d.path, async(req,res)=>{
            const {apikey} = req.headers;
            if(apikey != secretApiKey){
                return res.status(400).json({
                    message:"invalid api key"
                })
            }
            return d.handler(req,res);
        });
    })
})
app.get('/getUserStatus', async(req,res)=>{
    const users = await UserStatus.find({});
    return res.status(200).json({
        result:users
    })
})
app.get('/api/homepageVideoLink/Featured', async (req, res) => {
    try {
        const linkFeatured = await HomepageVideoLink.find({ section: "featured" });
        res.json(linkFeatured);
    } catch (err) {
        console.error('Error fetching links', err);
        res.status(500).json({ message: "Error fetching links" })

    }
})


app.get('/api/homepageVideoLink/learn', async (req, res) => {
    try {
        const linkFeatured = await HomepageVideoLink.find({ section: "learn" });
        res.json(linkFeatured);
    } catch (err) {
        console.error('Error fetching links', err);
        res.status(500).json({ message: "Error fetching links" })

    }
})


app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions' });
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
