const User = require("../models/user");
const path = require("path");
const fs = require("fs");

module.exports.profile = function (req, res) {
  User.findById(req.params.id)
    .then(function (profile_user) {
      return res.render("user_profile", {
        title: `Codeial | Profile`,
        profile_user: profile_user,
      });
    })
    .catch(function (err) {
      console.log("❌❌ Error : ", err);
      return res.redirect("back");
    });
};

// Render Sign Up Page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("user_sign_up", {
    title: "Codeial | SignUp",
  });
};

// Render sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("user_sign_in", {
    title: "Codeial | SignIn",
  });
};

// Get sign up data
module.exports.createUser = async function (req, res) {
  // Password and confirm password mismatch
  if (req.body.password != req.body.confirm_password) {
    req.flash("error", "Password mismatch!");
    return res.redirect("back");
  }
  // Check if user already exists
  try {
    const user_db = await User.findOne({ email: req.body.email }).exec();
    if (user_db) return res.redirect("/users/sign-in");
    // User does not exist, create it
    else {
      await User.create(req.body);
      req.flash("success", "Successfully signed up!");
      res.redirect("/users/sign-in");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

// Sign in and get the session
module.exports.createSession = function (req, res) {
  // req.flash("success", "Logged in successfully!");
  return res.redirect("/");
};

// Signout
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    return res.redirect("/");
  });
};

module.exports.update = async function (req, res) {
  try {
    if (req.params.id != req.user.id) throw 401;
    const user = await User.findById(req.params.id);

    User.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log("***** MulterError", err);
      }
      user.name = req.body.name;
      user.email = req.body.email;
      if (req.file) {
        // If user already has an avatar, delete it
        if (user.avatar) {
          const filePath = path.join(__dirname, "..", user.avatar);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        user.avatar = User.avatarPath + "/" + req.file.filename;
      }
      console.log(user);
      user.save();
      req.flash("success", "Details updated!");
      return res.redirect("back");
    });
  } catch (err) {
    if (err == 401) {
      req.flash("error", "You cannot update the details!");
      return res.status(401).send("Unauthorized");
    }
    return res.redirect("back");
  }
};
