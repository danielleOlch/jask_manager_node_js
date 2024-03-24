// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the user model
const userScheme = mongoose.Schema({
    email: String,
    name: String,
    password: String
});

// Create a model based on the user schema
const userModel = mongoose.model('Users', userScheme);

// Export the user model
module.exports = userModel;
