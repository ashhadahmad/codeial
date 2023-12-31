const express = require("express");
const passport = require("passport");
const router = express.Router();
const postsController = require("../controller/posts");

router.post(
  "/create",
  passport.checkAuthentication,
  postsController.createPost
);

router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postsController.destoryPost
);

module.exports = router;
