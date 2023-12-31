const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
          user: {
            id: req.user._id,
            name: req.user.name,
            avatar: req.user.avatar,
          },
        },
        message: "Post Created!",
      });
    }

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
      if (req.xhr) {
        return res.status(200).json({
          post_id: req.params.id,
          message: "Post deleted!",
        });
      }
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
