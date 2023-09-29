const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.postComment = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    const newComment = new Comment({
      content: req.body.content,
      user: req.user._id,
      post: post._id,
    });
    const comment = await newComment.save();
    post.comments.push(comment);
    post.save();
    return res.redirect("back");
  } catch (err) {
    console.log("❌❌ Error : ", err);
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

      res.redirect("back");
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.log("❌❌ Error : ", err);
    return res.redirect("back");
  }
};
