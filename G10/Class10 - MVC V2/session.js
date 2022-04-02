const session = require("express-session");

module.exports = session({
  secret: "user_me_secret_key",
  name: "user_me",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: true,
});
