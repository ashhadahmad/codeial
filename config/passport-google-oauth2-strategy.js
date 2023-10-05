const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("../config/environment");

passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callback_url,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Look for the user with the email
        const user = await User.findOne({
          email: profile.emails[0].value,
        }).exec();
        // If user exists, set it as req.user
        if (user) return done(null, user);
        else {
          // Else create that user
          await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
            avatar: profile.photos.at(0).value,
          });
          // And set it as req.user
          return done(null, user);
        }
      } catch (err) {
        console.log("*****Error in finding user Google OAuth", err);
      }
    }
  )
);
