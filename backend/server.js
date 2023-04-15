const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const workoutRoute = require('./routes/workout');
const userRoutes = require('./routes/user');

//middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.url);
    next();
})

//Routes
app.use('/api/workouts', workoutRoute);
app.use('/api/user',userRoutes);
const port = process.env.PORT;

const start = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port, ()=>{
            console.log('Connected to DB');
            console.log(`Server is listening on Port# ${port}`)
        })
    })
    .catch((error)=>{
        console.log(error);
    })
}

start();