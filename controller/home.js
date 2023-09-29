const Post = require("../models/post");

module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec()
    .then(function (posts) {
      return res.render("home", {
        title: "Codeial",
        posts: posts,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.render("home", {
        title: "Codeial",
      });
    });
};
