const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const MessageSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: false
  },
  receiver: {
    type: String,
    required: true
  },
  date: {
    type:Date,
    required: true,
  },
 
});
module.exports = Message = mongoose.model("messages", MessageSchema);