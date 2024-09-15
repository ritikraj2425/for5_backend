const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const {questionSchema}  = require('./Schemas/schemas');


// const mongoURI = "mongodb+srv://rajritik2425:qH8UD3y3ztRMZ2Kj@for5-db.o229c.mongodb.net/for5?retryWrites=true&w=majority";
const mongoURI = process.env.MONGO_URI;
const port = 5000;


mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const Question = mongoose.model('Questions',questionSchema);

// Endpoint to get all questions
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

// Endpoint to filter questions by subject
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

// Endpoint to test connection
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
