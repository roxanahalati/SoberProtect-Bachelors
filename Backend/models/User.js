const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  soberTime: {
    type: Date,
    required: true
  },
  addiction:{
    type: String,
    required: true
  },
  pledge:{
    type: String,
    required:false,
  },
  assignedTherapist:{
    type: String,
    required: true,
  },
  nextTherapySession:{
    type: String,
    required: true,
  },
  homework:{
    type: String,
    required: true,
  }
});
module.exports = User = mongoose.model("users", UserSchema);