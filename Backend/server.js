//dependecies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const forum = require("./routes/api/forum");
const comment = require("./routes/api/comment");
const therapist = require("./routes/api/therapist");
const messages = require("./routes/api/messages");
const homework = require("./routes/api/homework");
const homeworkComment = require("./routes/api/homeworkComment");

const { application } = require("express");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
//When getting a request for api/users, users is returned, which is the file users
app.use("/api/users", users);
app.use("/api/forum", forum);
app.use("/api/comment", comment);
app.use("/api/therapist", therapist);
app.use("/api/messages", messages);
app.use("/api/homework", homework);
app.use("/api/homeworkComment", homeworkComment);


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));