const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = function (req, res) {
  const newPost = new Post({
    content: req.body.content,
    user: req.user._id,
  });
  newPost
    .save()
    .then(function (val) {
      return res.redirect("back");
    })
    .catch(function (err) {
      console.log(err);
      return res.redirect("back");
    });
};

module.exports.destoryPost = function (req, res) {
  Post.findById(req.params.id)
    .exec()
    .then(function (post) {
      // Req.user.id has the ID of the user
      if (post.user == req.user.id) {
        Post.deleteOne({ _id: post.id })
          .then(function (val) {
            Comment.deleteMany({ post: req.params.id })
              .then(function (comments) {
                res.redirect("back");
              })
              .catch(function (err) {
                console.log("", err);
                res.redirect("back");
              });
          })
          .catch(function (err) {
            console.log(err);
            res.redirect("back");
          });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.redirect("back");
    });
};
