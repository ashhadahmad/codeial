const express = require("express");
const homeController = require("../controller/home");
const router = express.Router();

console.log("🏎️  Router Loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/api", require("./api"));

module.exports = router;
