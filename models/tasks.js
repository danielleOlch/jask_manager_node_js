// Importing the mongoose library
const mongoose = require('mongoose');

// Define the schema for the task model
const tasksScheme = mongoose.Schema({
    title: String,
    category: String,
    description: String,
    isDone: Boolean,
    douDate: String
});

// Create a model based on the task schema
const tasksModel = mongoose.model('tasks', tasksScheme);

// Export the user model
module.exports = tasksModel;