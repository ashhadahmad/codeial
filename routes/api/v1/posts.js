const express = require("express");
const router = express.Router();
const postsAPI = require("../../../controller/api/v1/posts_api");

router.get("/", postsAPI.index);
router.delete("/:id", postsAPI.destoryPost);

module.exports = router;
