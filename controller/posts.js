const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash("success", "Post published !");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destoryPost = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id).exec();
    // Req.user.id has the ID of the user
    if (post.user == req.user.id) {
      await Post.deleteOne({ _id: post.id });
      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post deleted!");
      res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
