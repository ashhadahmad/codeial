const User = require("../models/user");

module.exports.profile = function (req, res) {
  res.render("user_profile", {
    title: "Codeial | Profile",
  });
};

// Render Sign Up Page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("user_sign_up", {
    title: "Codeial | SignUp",
  });
};

// Render sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("user_sign_in", {
    title: "Codeial | SignIn",
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
  return res.redirect("/users/profile");
};

// Signout
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};
