const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

// Setup the express app
const app = express();

// Reading post requests
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

// Set view engine to EJS and path to all the views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Use Assets from /assets
app.use(express.static("assets"));

// Use the express router
app.use("/", require("./routes"));

// Run the server
app.listen(port, (err) => {
  if (err) {
    console.log("❌ Error in running the server");
  } else {
    console.log(`🚀 Server is up at http://localhost:${port}`);
  }
});
