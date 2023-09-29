const Post = require("../models/post");
const User = require("../models/user");

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
      User.find({})
        .then(function (users) {
          return res.render("home", {
            title: "Codeial",
            posts: posts,
            all_users: users,
          });
        })
        .then(function (err) {
          console.log(err);
        });
    })
    .catch(function (error) {
      console.log(error);
      res.render("home", {
        title: "Codeial",
      });
    });
};
