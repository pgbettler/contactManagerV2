// This is the data model (Schema) for a login information.
// By using this code, we’re creating a new Mongoose model for the login entity
// with the following properties included:
// 1: username
// 2: password

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Register = new Schema({
    // USER ID not already!!!
    //{}
    username:
    {
        type: String
    },
    password:
    {
        type: String
    }
});

// The model is created by defining a new Schema first and then creating 
// the model by using the mongoose.model method.
module.exports = mongoose.model('Register', Register);