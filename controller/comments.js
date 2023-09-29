const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.postComment = function (req, res) {
  Post.findById(req.body.post)
    .then(function (post) {
      const newComment = new Comment({
        content: req.body.content,
        user: req.user._id,
        post: post._id,
      });
      newComment
        .save()
        .then(function (comment) {
          post.comments.push(comment);
          post.save();
          return res.redirect("back");
        })
        .catch(function (err) {
          console.log(err);
          return res.redirect("back");
        });
    })
    .catch(function (err) {
      console.log(err);
      return res.redirect("back");
    });
};

module.exports.destoryComment = function (req, res) {
  Comment.findById(req.params.id)
    .then(function (comment) {
      if (comment.user == req.user.id) {
        let postId = comment.post;
        Comment.deleteOne({ _id: req.params.id })
          .then(function (val) {
            Post.findByIdAndUpdate(postId, {
              $pull: { comments: req.params.id },
            })
              .then(function (val) {
                res.redirect("back");
              })
              .catch(function (err) {
                console.log(err);
              });
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
