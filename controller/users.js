const User = require("../models/user");

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
  req.flash("success", "Logged in successfully!");
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

module.exports.update = function (req, res) {
  if (req.params.id == req.user.id) {
    User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
    })
      .then(function (user) {
        req.flash("success", "Details updated!");
        return res.redirect("back");
      })
      .catch(function (err) {
        req.flash("error", err);
        return res.redirect("back");
      });
  } else {
    req.flash("error", "You cannot update the details!");
    res.status(401).send("Unauthorized");
  }
};
