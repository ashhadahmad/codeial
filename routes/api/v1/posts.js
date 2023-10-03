const express = require("express");
const router = express.Router();
const postsAPI = require("../../../controller/api/v1/posts_api");
const passport = require("passport");

router.get("/", postsAPI.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsAPI.destoryPost
);

module.exports = router;
