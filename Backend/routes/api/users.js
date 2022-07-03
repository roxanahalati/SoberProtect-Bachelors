const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const req = require("express/lib/request");
const { mongoURI } = require("../../config/keys");
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;


router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        let dateTime;
        if(req.body.soberMoment == undefined)
        {
          dateTime = new Date();
        }
        else
        {
          dateTime = req.body.soberMoment
        }
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          soberTime: dateTime,
          addiction: req.body.addiction,
          pledge: req.body.pledge,
          assignedTherapist: '0',
          nextTherapySession: '1970-01-01T00:00:00.000Z',
          homework: "N/A"
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
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
                username: user.username,
                email: user.email,
                soberTime: user.soberTime,
                pledge: user.pledge,
                addiction: user.addiction,
                assignedTherapist: user.assignedTherapist,
                nextTherapySession: user.nextTherapySession,
                homework: user.homework,
                userID: user._id,
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

  router.post("/findUser", (req, res) => {
    User.findOne({ email: req.query.email }).then(user => {

      if (user) {
        return res.status(400).json({ name: user.name, soberTime: user.soberTime, pledge: user.pledge});
      } 
  } )
});

router.post("/assignHomework", (req, res) => {

    User.findOne({_id: req.body.assignedTo}).then(user => {
      MongoClient.connect(mongoURI, function(err, db) {
      var dbo = db.db("test");
      var newID = mongoose.Types.ObjectId(req.body.assignedTo);
      var myquery = { _id: newID };
      var newvalues = {$set: {homework: req.body.homeworkID} };
      dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        db.close();
    })
    
    });
    });
});

router.post("/solveHomework", (req, res) => {
  User.findOne({_id: req.body.userID}).then(user => {
    MongoClient.connect(mongoURI, function(err, db) {
      var dbo = db.db("test");
      var newID = mongoose.Types.ObjectId(req.body.userID);
      var myquery = { _id: newID };
      var newvalues = {$set: {homework: 'N/A'} };
      dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated solve homework");
        db.close();
    })
    
    });
  })
})

router.post("/updateSession", (req, res) => {
  User.findOne({_id: req.body.userID}).then(user => {
    MongoClient.connect(mongoURI, function(err, db) {
    var dbo = db.db("test");
    var newID = mongoose.Types.ObjectId(req.body.userID);
    var myquery = { _id: newID };
    var newvalues = {$set: {nextTherapySession: req.body.date} };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated update ession");
      db.close();
  })
  
  });
  });
});

router.post("/addTherapist", (req, res) => {
  User.findOne({username: req.body.username}).then(user => {

    MongoClient.connect(mongoURI, function(err, db) {
      var dbo = db.db("test");
      var myquery = { username: req.body.username };
      var newvalues = {$set: {assignedTherapist: req.body.therapistID} };
      dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated add therapist");
        db.close();
    })
    
    });

  })
})

router.post("/resetTimer", (req, res) => {
  const now = new Date();
  User.findOne({ email: req.query.email }).then(user => {
    user.soberTime = now;

    MongoClient.connect(mongoURI, function(err, db) {
      var dbo = db.db("test");
      var myquery = { email: req.query.email };
      var newvalues = {$set: {soberTime: now} };
      dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated reset timer");
        db.close();
    })
    
    });
  })
});



router.post("/findClients", (req, res) => {
  MongoClient.connect(mongoURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("users").find({assignedTherapist: req.body.therapist}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      return res.status(400).json(result);

    });
  });
});


  module.exports = router;