const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const routes = require("./AllApis/AllRoutes");
require('dotenv').config();
app.use(cors());
app.use(express.json());
const mongoURI = process.env.MONGO_URI;
const secretApiKey = process.env.API_KEY;
const port = 5000;


mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });



routes.forEach((route)=>{
    Object.keys(route.routes).forEach((method)=>{
        route.routes[method].forEach((api)=>{
            app[method](route.parentPath + api.path , async(req,res)=>{
                const {apikey} = req.headers;
                if(!apikey){
                    return res.status(404).json({
                        message:"api key not found"
                    })
                }
                if(apikey != secretApiKey){
                    return res.status(400).json({
                        message:"invalid api key"
                    })
                }
                return api.handler(req,res);
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
