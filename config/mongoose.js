const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/codeial_development")
  .then(() => {
    console.log("🟩 Successfully connected to DB");
  })
  .catch((error) => console.log("❌ Error connecting to the db", error));

module.exports = mongoose.connection;
