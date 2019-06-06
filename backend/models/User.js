// Create a Schema to represent a User, defining fields and types as objects of the Schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: 
  {
    type: String,
    required: true
  },
  password: 
  {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);