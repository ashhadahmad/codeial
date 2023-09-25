const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
      .exec()
      .then((user) => {
        if (user) {
          return res.render("user_profile", {
            title: "Codeial | User Profile",
            user: user,
          });
        } else {
          return res.redirect("/users/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        return res.redirect("/users/sign-in");
      });
  } else {
    return res.redirect("/users/sign-in");
  }
};

// Render Sign Up Page
module.exports.signUp = function (req, res) {
  res.render("user_sign_up", {
    title: "Codeial | SignUp",
  });
};

// Render sign in page
module.exports.signIn = function (req, res) {
  res.render("user_sign_in", {
    title: "Codeial | SignUp",
  });
};

// Get sign up data
module.exports.createUser = function (req, res) {
  // Password and confirm password mismatch
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  // Check if user already exists
  User.findOne({ email: req.body.email })
    .exec()
    .then(function (val) {
      if (!val) {
        const newUser = new User(req.body);
        newUser
          .save()
          .then(function () {
            console.log("✨✨✨", newUser);
            res.redirect("/users/sign-in");
          })
          .catch((err) => {
            console.log(err);
            res.redirect("back");
          });
      } else {
        return res.redirect("/users/sign-in");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("back");
    });
};

// Sign in and get the session
module.exports.createSession = function (req, res) {
  // Find the user
  User.findOne({ email: req.body.email })
    .exec()
    .then(function (user) {
      // Handle user not found
      if (user == null) {
        return res.redirect("back");
      }
      // Handle user found
      // Handle password mismatch
      if (req.body.password != user.password) {
        return res.redirect("back");
      }
      // Match Passwords
      // Handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.signOut = function (req, res) {
  res.clearCookie("user_id");
  res.redirect("/users/sign-in");
};
