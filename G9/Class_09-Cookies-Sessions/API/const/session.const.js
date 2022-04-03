const session = require("express-session");

module.exports = session({
  secret: ["asdfghjkl"], // To update the secret add a new value,
  name: "cookie_id",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
  },
  saveUninitialized: true,
  resave: false
});