const express = require("express");
const router = express.Router();

const passport = require("passport");

//Load the Post model
const Post = require("../../models/Post");
//Load the Profile model
const Profile = require("../../models/Profile");
//Load validation
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

// @route   GET   api/posts/test
// @desc    Tests Posts route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts works" });
});

// @route   GET   api/posts/
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({ noposts: "No posts found" }));
});

// @route   GET   api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(400).json({ nopost: "No post found with provided ID" })
    );
});

// @route   POST   api/posts/
// @desc    Create Post route
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Bring in validation later on
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.json(err));
  }
);

// @route   POST   api/posts/:id/like
// @desc    Create like Posts route
// @access  Private
router.post(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //There must be a valid profile for the logged in user doing the "like"
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noprofile = "No profile found for user";
        return res.status(400).json(errors);
      }
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          if (post.user.toString() === req.user.id) {
            errors.addlikenotallowed = "User can't 'like' own posts";
            return res.status(400).json(errors);
          }
          post.likes.unshift({ user: req.user.id });
          post
            .save()
            .then(post => res.json(post))
            .catch(err =>
              res.status(400).json({ addlike: "Error doing like" })
            );
        })
        .catch(err => res.status(400).json(err));
    });
  }
);

// @route   POST   api/posts/:id/unlike
// @desc    Create like Posts route
// @access  Private
router.post(
  "/:id/unlike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //There must be a valid profile for the logged in user doing the "like"
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noprofile = "No profile found for user";
        return res.status(400).json(errors);
      }
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            errors.notliked = "Can't unlike post without like";
            return res.status(400).json(errors);
          }

          const deleteIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(deleteIndex, 1);
          post
            .save()
            .then(post => res.json(post))
            .catch(err =>
              res.status(400).json({ postunlike: "Couldn't unlike post" })
            );
        })
        .catch(err => res.status(400).json(err));
    });
  }
);

// @route   POST   api/posts/:id/comment
// @desc    Add comment to post route
// @access  Private
router.post(
  "/:id/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //Add comment to comments
        post.comments.unshift(newComment);
        //Save post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE   api/posts/:id/comment/:comment_id
// @desc    Remove comment from post route
// @access  Private
router.delete(
  "/:id/comment/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Check if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: "Comment does not exists" });
        }
        //Check if comment owner is the remover
        if (
          post.comments.filter(
            comment =>
              comment._id.toString() === req.params.comment_id &&
              comment.user.toString() === req.user.id
          ).length === 0
        ) {
          return res.status(404).json({
            commenttodeletenotyours:
              "Comment does not belong to requesting user"
          });
        }
        //Get the remove index
        const removeIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        //Save post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   Delete   api/posts/:id
// @desc    Delete Posts route
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //Check post ownership is matching user issuing delete
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          post
            .remove()
            .then(() => res.json({ success: true, msg: "Post deleted" }))
            .catch(err =>
              res.status(404).json({ nopostfound: "Post not found" })
            );
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
