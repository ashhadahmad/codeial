const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "12059870234-sqqhbc62hs1c9n9sd8peds2tugehasaf.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Look for the user with the email
      User.findOne({ email: profile.emails[0].value })
        .exec()
        .then(function (user) {
          console.log(profile);
          // If user exists, set it as req.user
          if (user) return done(null, user);
          else {
            // Else create that user
            User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
              avatar: profile.photos.at(0).value,
            })
              .then(function (user) {
                // And set it as req.user
                return done(null, user);
              })
              .catch(function (err) {
                console.log("***** Error in creating user Google OAuth", err);
              });
          }
        })
        .catch(function (err) {
          console.log("*****Error in finding user Google OAuth", err);
        });
    }
  )
);
