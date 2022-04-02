const session = require("express-session");

const authProductsSession = session({
  secret: "our_secret_123",
  name: "cookie_id",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: true,
});

/**
 * When we generate two or more session they must have different secret value and different name value =)
 * Two different session does not see each other, they do not mix =) ( their sessios data/session object does not mix )
 */
const fruitsSession = session({
  secret: "new_secret",
  name: "fruits_cookie",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: false,
});

// // module.exports = {
//     createSession: createSession,
//     fruitsSession: fruitsSession
// };

module.exports = { authProductsSession, fruitsSession };
