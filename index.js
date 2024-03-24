// Module import and server setup
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tasksModel = require('./models/tasks');
const tasksRouter = require('./routes/tasksRouter');
const userRouter = require('./routes/usersRouter');

// Middleware for parsing requests
app.use(bodyParser.json());

// Route configuration for tasks and users
app.use('/tasks', tasksRouter);
app.use('/users', userRouter);

// Server startup and MongoDB connection
app.listen(port, () => {
    console.log("Server started");
    connect();
});

// MongoDB connection function
function connect() {
    mongoose.connect('mongodb://localhost:27017/tasksProject').then(connect => {
        console.log("MongoDB connected");
    });
}
