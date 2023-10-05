const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes",
        },
      })
      .populate("likes")
      .exec();
    const users = await User.find({});
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    req.flash("error", err);
    res.redirect("back");
  }
};
