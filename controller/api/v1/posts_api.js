const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        options: { sort: { createdAt: -1 } },
      },
    })
    .exec();
  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destoryPost = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id).exec();
    // Req.user.id has the ID of the user
    // if (post.user == req.user.id) {
    await Post.deleteOne({ _id: post.id });
    await Comment.deleteMany({ post: req.params.id });
    return res.status(200).json({
      post_id: req.params.id,
      message: "Post deleted!",
    });
    // } else {
    //   req.flash("error", "You cannot delete this post");
    //   return res.redirect("back");
    // }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Server error",
    });
  }
};
