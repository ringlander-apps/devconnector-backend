const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

//Load Input validation for Profile
const validateProfileInput = require("../../validation/profile");

//Load Input validation for Profile.experience
const validateExperienceInput = require("../../validation/experience");

//Load profile
const Profile = require("../../models/Profile");
//Load user
const User = require("../../models/User");

// @route   GET   api/profile/test
// @desc    Tests Profile route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile works" });
});

// @route   GET   api/profile
// @desc    Current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(error => res.status(404).json(error));
  }
);
// @route   GET   api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(400).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});
// @route   GET   api/profile/user/:user_id
// @desc    Get profile by User Id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(400).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err =>
      res.status(404).json({ noprofile: "There is no profile for this user" })
    );
});
// @route   GET   api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(400).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err =>
      res.status(404).json({ noprofiles: "There are no profiles" })
    );
});
// @route   POST   api/profile
// @desc    Create / Edit User Profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Skills
    if (typeof (req.body.skills !== "undefined")) {
      profileFields.skills = req.body.skills.split(",");
    }
    //Socials
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          //Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          //Create

          //First check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }
            //Save
            new Profile(profileFields).save().then(profile => {
              res.json(profile);
            });
          });
        }
      })
      .catch();
  }
);
// @route   POST   api/profile/experience
// @desc    Add / Edit User Experience
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }) //fetch the user information provided in token
      .then(profile => {
        if (!profile) {
          errors.noprofile = "NO profile found for this user";
          return res.status(400).json(errors);
        } else {
          //Create new experience object with validated form fields
          const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };
          //Add to experience array
          profile.experience.unshift(newExp);
          //Save the profile
          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => res.status(400).json(err));
        }
      });
  }
);
module.exports = router;
