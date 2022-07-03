const express = require("express");
const router = express.Router();
const ForumComment = require("../../models/Comment");
const { mongoURI } = require("../../config/keys");
var MongoClient = require('mongodb').MongoClient;

router.post("/createComment", (req, res) => {
    const dateTime = new Date();
    const newComment = new ForumComment({
          body: req.body.body,
          username: req.body.username,
          forumID: req.body.fid,
          dateAdded: dateTime
        });
    newComment
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

router.post("/findAll", (req, res) => {

  MongoClient.connect(mongoURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("comments").find({forumID: req.body.fid}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      return res.status(400).json(result);

    });
  });
})




  module.exports = router;