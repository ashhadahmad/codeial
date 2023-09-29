const express = require("express");
const passport = require("passport");
const router = express.Router();
const commentsController = require("../controller/comments");

router.post(
  "/post",
  passport.checkAuthentication,
  commentsController.postComment
);

router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  commentsController.destoryComment
);

module.exports = router;
