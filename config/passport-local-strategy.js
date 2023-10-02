const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Auth using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //  Find a user and establish the identity
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            req.flash("error", "Invalid Username/Password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user -> Passport");
          return done(err);
        });
    }
  )
);

// Serialize the user to decide the key to be kept in the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .exec()
    .then((val) => {
      return done(null, val);
    })
    .catch((err) => {
      console.log("Error in finding User -> deserializeUser");
      return done(err);
    });
});

// Creating a middleware on passport object (could've been on any other object as well)
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, pass the request to next function
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
