const Post = require("../models/post");

module.exports.createPost = function (req, res) {
  console.log(req.body);
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
