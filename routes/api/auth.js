const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//Load User model
const User = require("../../models/User");

// @route   GET   api/auth/test
// @desc    Tests Auth route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Auth works" });
});

// @route   GET   api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", (req, res) => {
  //Use our User model to see if user matching provided email exists
  User.findOne({
    email: req.body.email
  }).then(user => {
    //if user already exists
    if (user) {
      //return 400 status along with json
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
module.exports = router;
