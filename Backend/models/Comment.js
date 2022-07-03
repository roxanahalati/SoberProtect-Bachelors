const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ForumCommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false
  },
  dateAdded: {
    type: Date,
    required: true
  },
  forumID: {
    type:String,
    required: true,
  },
});
module.exports = ForumComment = mongoose.model("comment", ForumCommentSchema);