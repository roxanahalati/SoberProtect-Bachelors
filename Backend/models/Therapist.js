const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TherapistSchema = new Schema({
  name: {
      type: String,
      required: true,
  },
  email: {
     type: String,
     required: true,
  },
  password:{
    type: String,
    required: true,
  },
  experience: {
      type: String,
      required: true,
  },
  price: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: true,
  }
});
module.exports = Therapist = mongoose.model("therapist", TherapistSchema);