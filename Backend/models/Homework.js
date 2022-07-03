const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const HomeworkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  homeworkBody: {
    type:String,
    required: false,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true
  },
});
module.exports = Homework = mongoose.model("homework", HomeworkSchema);