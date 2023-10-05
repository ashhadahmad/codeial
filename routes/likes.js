const express = require("express");
const likeController = require("../controller/likes");
const router = express.Router();

router.post("/toggle", likeController.toggleLike);

module.exports = router;
