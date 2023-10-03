const express = require("express");
const router = express.Router();
const usersAPI = require("../../../controller/api/v1/users_api");

router.use("/create-session", usersAPI.createSession);
module.exports = router;
