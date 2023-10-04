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
      callbackURL: "https://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Look for the user with the email
        await User.findOne({ email: profile.emails[0].value }).exec();
        console.log(profile);
        // If user exists, set it as req.user
        if (user) return done(null, user);
        else {
          // Else create that user
          const user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          // And set it as req.user
          return done(null, user);
        }
      } catch (err) {
        console.log("*****Error in Google strategy", err);
        return;
      }
    }
  )
);
