const express = require("express");
const router = express.Router();
const Therapist = require("../../models/Therapist");
const validateLoginInput = require("../../validation/login");
const { mongoURI } = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
  
router.get("/findTHerapist", (req, res) => {
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
    dbo.collection("therapists").find({forumID: req.body.fid}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      return res.status(400).json(result);

    });
  });
})


router.post("/findNameByID", (req, res) => { 
  var id = mongoose.Types.ObjectId(req.body.therapistID);
  Therapist.findOne({_id: id}).then(therapist => { 
    return res.status(400).json({name: therapist.name});
  })
})

  module.exports = router;

  router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
    const email = req.body.email;
      const password = req.body.password;
      Therapist.findOne({ email }).then(user => {
        if (!user) {
          return res.status(404).json({ emailnotfound: "Email not found" });
        }
    // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name
            };
    // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
  
                res.json({
                  success: true,
                  token: "Bearer " + token,
                  name: user.name,
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
      });
    });