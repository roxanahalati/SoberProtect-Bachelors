const express = require("express");
const router = express.Router();
const ForumTopic = require("../../models/ForumTopic");
const { mongoURI } = require("../../config/keys");
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

router.post("/createTopic", (req, res) => {
    const dateTime = new Date();
    const newTopic = new ForumTopic({
          title: req.body.title,
          body: req.body.body,
          username: req.body.username,
          lastUpdate: dateTime
        });
    newTopic
        .save()
        .then(topic => res.json(topic))
        .catch(err => console.log(err));
});
 
  
router.get("/findTopic", (req, res) => {
    ForumTopic.findOne({ fid: req.query.fid }).then(topic => {

      if (topic) {
        return res.status(400).json({ fid: topic.fid, title: topic.title, body: topic.body, date: topic.lastUpdate});
      } 
  } )
});

router.get("/findAll", (req, res) => {

    MongoClient.connect(mongoURI, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("forums").find({}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        return res.status(400).json(result);

      });
    });
  });
  
router.post("/updateDate", (req, res) => {
    const now = new Date();
    ForumTopic.findOne({ _id: req.body.fid }).then(topic => {
      topic.lastUpdate = now;
      MongoClient.connect(mongoURI, function(err, db) {
        var dbo = db.db("test");
        var newID = mongoose.Types.ObjectId(req.body.fid);
        var myquery = { _id: newID };
        var newvalues = {$set: {lastUpdate: now} };
        dbo.collection("forums").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated update date");
          db.close();
      })
      
      });

  })

});

  module.exports = router;