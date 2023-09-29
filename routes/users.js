const express = require("express");
const passport = require("passport");
const router = express.Router();
const usersController = require("../controller/users");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);

// router.get(
//   "/profile",
//   passport.checkAuthentication,
//   usersController.profileBlank
// );

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.get("/sign-out", usersController.destroySession);
// Use passport middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
router.post("/create", usersController.createUser);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

module.exports = router;
