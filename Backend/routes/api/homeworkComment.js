const express = require("express");
const router = express.Router();
const HomeworkComment = require("../../models/HomeworkComment");
const { mongoURI } = require("../../config/keys");
var MongoClient = require('mongodb').MongoClient;

router.post("/createComment", (req, res) => {
    const dateTime = new Date();

    const newHomeworkComment = new HomeworkComment({
          body: req.body.body,
          homeworkID: req.body.homeworkID,
          username: req.body.username,
          dateAdded: dateTime
        });
    newHomeworkComment
        .save()
        .then(message => res.json(message))
        .catch(err => console.log(err));
});

router.post("/findAll", (req, res) => {
    MongoClient.connect(mongoURI, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("homeworkcomments").find({homeworkID: req.body.homeworkID}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        return res.status(400).json(result);
  
      });
    });
  })
 

  module.exports = router;