const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment");

// Sign in and get the session
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    return res.json(200, {
      message: "Success, here is your token",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "600000" }),
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Server error",
    });
  }
};
