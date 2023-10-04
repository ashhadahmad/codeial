const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comment_mailer");
module.exports.postComment = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    const comment = await Comment.create({
      content: req.body.content,
      user: req.user._id,
      post: post._id,
    });
    post.comments.push(comment);
    await post.save();
    // comment = await comment.populate("user", "name email").execPopulate();
    console.log(comment);
    // commentsMailer.newComment(comment);
    req.flash("success", "Comment published!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destoryComment = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      await Comment.deleteOne({ _id: req.params.id });
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash("success", "Comment deleted!");
      res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this comment!");
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
