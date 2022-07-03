const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");
const { mongoURI } = require("../../config/keys");
var MongoClient = require('mongodb').MongoClient;

router.post("/createMessage", (req, res) => {
    const dateTime = new Date();
    const newMessage = new Message({
          body: req.body.body,
          sender: req.body.sender,
          receiver: req.body.receiver,
          date: dateTime
        });
    newMessage
        .save()
        .then(message => res.json(message))
        .catch(err => console.log(err));
});
 
router.post("/findAll", (req, res) => {
  MongoClient.connect(mongoURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("messages")
    .find({
        $and: [
            { $or: [ { sender: req.body.sender }, { sender : req.body.receiver } ] },
            { $or: [ { receiver: req.body.receiver }, { receiver: req.body.sender } ] }
        ]
    }).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      return res.status(400).json(result);

    });
  });
})

  module.exports = router;