const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const HomeworkCommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    required: true
  },
  homeworkID: {
    type:String,
    required: true,
  },
  username: {
    type:String,
    required: true,
  }
});
module.exports = HomeworkComment = mongoose.model("homeworkComment", HomeworkCommentSchema);