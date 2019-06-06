// This is the data model (Schema) for a contact information.
// By using this code, we’re creating a new Mongoose model for the contact entity
// with the following properties included:
// 1: First name
// 2: Last name
// 3: Phone number
// 4: Email address
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
    firstName:
    {
        type: String
    },
    lastName:
    {
        type: String
    },
    phoneNumber:
    {
        type: String
    },
    emailAddress:
    {
        type: String
    },
    approved: Boolean
});

// The model is created by defining a new Schema first and then creating 
// the model by using the mongoose.model method.
module.exports = Contact;