const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ForumTopicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: false
  },
  lastUpdate: {
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});
module.exports = ForumTopic = mongoose.model("forum", ForumTopicSchema);