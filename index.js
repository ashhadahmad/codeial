const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

// Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

// Setup the express app
const app = express();

// Reading post requests
app.use(express.urlencoded());
app.use(cookieParser());

// Use Assets from /assets
app.use(express.static("assets"));

app.use(expressLayouts);
// Extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Set view engine to EJS and path to all the views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Mongo store is used to store the session cookie in the DB
app.use(
  session({
    name: "codeial",
    // todo : Change the secret before deployment
    secret: "blahblahblah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use the express router
app.use("/", require("./routes"));

// Run the serve
app.listen(port, (err) => {
  if (err) {
    console.log("❌ Error in running the server");
  } else {
    console.log(`🚀 Server is up at http://localhost:${port}`);
  }
});
