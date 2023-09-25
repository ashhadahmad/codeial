const express = require("express");
const homeController = require("../controller/home");
const router = express.Router();

console.log("🏎️  Router Loaded");

router.get("/", homeController.home);

router.use("/users", require("./users"));

module.exports = router;
