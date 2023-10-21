const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahblahblah",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  },
  google_client_id:
    "",
  google_client_secret: "",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "secret-change-before-use",
};

const production = {
  name: "development",
};

module.exports = development;
