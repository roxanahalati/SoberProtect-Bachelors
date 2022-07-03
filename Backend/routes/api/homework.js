const express = require("express");
const router = express.Router();
const Homework = require("../../models/Homework");
const { mongoURI } = require("../../config/keys");
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

router.post("/createHomework", (req, res) => {
    const dateTime = new Date();

    const newHomework = new Homework({
          title: req.body.title,
          homeworkBody: "",
          assignedTo: req.body.assignedTo,
          dateAdded: dateTime
        });
    newHomework
        .save()
        .then(message => res.json(message))
        .catch(err => console.log(err));
    
});

router.post("/solveHomework", (req, res) => {
    User.findOne({_id: req.body.homeworkID}).then(user => {
      MongoClient.connect(mongoURI, function(err, db) {
        var dbo = db.db("test");
        var newID = mongoose.Types.ObjectId(req.body.homeworkID);
        var myquery = { _id: newID };
        var newvalues = {$set: {homeworkBody: req.body.homeworkBody} };
        dbo.collection("homeworks").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated solve homework");
          db.close();
      })
      
      });
    })
  })

router.post("/findAll", (req, res) => {
    MongoClient.connect(mongoURI, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("homeworks").find({assignedTo: req.body.assignedTo}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        return res.status(400).json(result);

      });
    });
  });

router.post("/getHomeworkBody", (req, res) => {
    MongoClient.connect(mongoURI, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("homeworks").find({title: req.body.title}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        return res.status(400).json(result);

      });
    });
  });
  
router.post("/findOne", (req, res) => {

  var newID = mongoose.Types.ObjectId(req.body.homeworkID);
    MongoClient.connect(mongoURI, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("homeworks").find({_id: newID}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        return res.status(400).json(result);

      });
    });
  });

 
  module.exports = router;