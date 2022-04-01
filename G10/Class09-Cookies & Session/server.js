const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");

const app = express();

// cookies are small simple files/data that are stored inside the browser :)
// and they are send with every request made to the server.

/**
 * There is a better way of handling/creting cookies =)
 * We can create a session:
 * And this session will GENERATE THE COOKIE FOR US =);
 *
 * 1. express-session => generetes cookie for us, and it saves it in the browser/client.
 * SESSION DATA is not saved in the cookie itself, just the session ID
 * SESSION DATA is stored on the SERVER-SIDE
 * We would not longer need cookie-parser :)
 * If we have a DB we can store the session inside this DB =) thanks to express-session
 *
 *
 * 2. cookie-session => generetes cookie for us, and it saves it in the browser/client.
 * IT SAVES THE SESSION DATA ONCE AGAIN THE CLIENT SIDE/BROWSER
 * IT IS LIMITED TO 4000 BYTES =)
 *
 * If we have light-weight app, that does not have a DB then we can go with cookie-session
 */

/**
 *  When we crete a session:
 *      - It generetes a unique session id for us :)
 *      - Stores this session id for us in the session cookie.
 *      - Creates an empty session object, req.session
 *
 * saveUninitialized => If it is set TRUE, means that during the lifetime of the request
 * we do not modify the req.session object, the req.session object will be saved on the session store/server side
 */

const createSession = session({
  secret: "our_secret_123",
  name: "cookie_id",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: true,
});

// It is same as above :)

// app.use(
//   session({
//     secret: "our_secret_123",
//     name: "cookie_id",
//     cookie: {
//       maxAge: 5 * 60 * 60 * 1000,
//     },
//     saveUninitialized: true,
//     resave: false,
//   })
// );

app.use(createSession);
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(productsRoutes);

app.listen(3000, "localhost", () => {
  console.log("Server is up and running on PORT:3000");
});
