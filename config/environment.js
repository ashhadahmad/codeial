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
    "12059870234-sqqhbc62hs1c9n9sd8peds2tugehasaf.apps.googleusercontent.com",
  google_client_secret: "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",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
};

const production = {
  name: "development",
};

module.exports = development;
