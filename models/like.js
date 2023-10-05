const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    // Object id of the liked post
    likeable: {
      type: mongoose.Schema.ObjectId,
      require: true,
      refPath: "onModel",
    },
    // Dynamic reference to the liked post
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
