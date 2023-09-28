const Post = require("../models/post");

module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .exec()
    .then(function (posts) {
      console.log(posts);
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
