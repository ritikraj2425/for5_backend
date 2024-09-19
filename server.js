const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());




const {questionSchema}  = require('./Schemas/schemas');


const mongoURI = process.env.MONGO_URI;
const port = 5000;



mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));



const videoLinkSchema = new mongoose.Schema({
    VideoId: String,
    section: String,
    link: String
}, { collection: 'HomepageVideos' })


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    firebaseID: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    bio: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    }
},{collection : 'Users'})


const Question = mongoose.model('Question', questionSchema);
const HomepageVideoLink = mongoose.model('HomepageVideos', videoLinkSchema)
const Users  = mongoose.model('Users',userSchema)


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

app.post('/post/userDetails', async(req,res)=>{
    const dataOfUser = req.body;
    const user = new Users(dataOfUser);
    await user.save();
    res.status(200).send({msg:"success"});
})

app.get('/get/userDetails', async(req,res)=>{
    const {uid} = req.query;
    const user  = await Users.findOne({firebaseID: uid})
    if(!user){
        console.log("user not found");
    }
    res.status(200).json(user);
})


app.post("/posting", async (req,res)=>{
    const dataFromUser = req.body;
    for(let item of dataFromUser){

        const data = new Question(item)
        await data.save();
    }
    res.status(200).send({msg:"success"});
})




app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        console.log(questions);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions' });
    }
});
app.post("/posting", async (req,res)=>{
    const dataFromUser = req.body;
    for(let item of dataFromUser){
        const data = new Question(item)
        await data.save();
    }
    res.status(200).send({msg:"success"});
})

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


app.get('/api/questions/filter/:subject', async (req, res) => {
    try {
        const questions = await Question.find({ subject: req.params.subject });
        if (questions && questions.length > 0) {
            res.json(questions);
        } else {
            res.status(404).json({ message: 'Questions not found for this subject' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/api/test', async (req, res) => {
    try {
        const count = await Question.countDocuments({});
        res.json({ message: `Number of documents: ${count}` });
    } catch (error) {
        res.status(500).json({ message: 'Error testing connection' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
