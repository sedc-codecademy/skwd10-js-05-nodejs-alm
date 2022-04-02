const router = require("express").Router();
const session = require("../sessions/sessions.const");

router.get("/", (req, res) => {
  res.send("<h1>Main page</h1>");
});

// *** COOKIES ***

// router.get("/logged_in", (req, res) => {
//     console.log(req.cookies);

//     const cookie = req.cookies;

//     if (cookie.user_me) {
//       return res.send("<h1>You are logged in amigo :)</h1>");
//     } else {
//       res.redirect("/");
//     }
//   });

// router.post("/login", (req, res) => {
//   const dummyUser = {
//     username: "user_123",
//     password: "user_123",
//   };

//   const credentials = req.body;

//   if (
//     credentials.username === dummyUser.username &&
//     credentials.password === dummyUser.password
//   ) {
//     // res.cookie("language", "FR")
//     // res.cookie("our_cart", { ourCart: ["Banana", "Orange", "Bread"] });

//     res.cookie("user_me", "our_session_id");

//     res.status(200).send({ message: "User is logged in" });
//   } else {
//     return res.status(403).send({ message: "Bad credentials" });
//   }
// });

// router.post("/logout", (req, res) => {
//   res.clearCookie("user_me");
//   return res.send({ message: "Logout successful" });
// });

// *** EXPRESS-SESSION ***

router.post("/login", session.authProductsSession, (req, res) => {
  const dummyUser = {
    username: "user_123",
    password: "user_123",
  };

  const credentials = req.body;

  if (
    credentials.username === dummyUser.username &&
    credentials.password === dummyUser.password
  ) {
    req.session.loggedIn = true;

    // req.session.cart = [{ name: "Bread" }, { name: "Coffee" }];

    console.log("Session id ", req.sessionID);
    console.log("Session object ", req.session);

    res.status(200).send({ message: "User is logged in" });
  } else {
    return res.status(403).send({ message: "Bad credentials" });
  }
});

router.get("/logged_in", session.authProductsSession, (req, res) => {
  console.log(req.cookies);

  const isLoggedIn = req.session.loggedIn;
  console.log(req.session);

  if (isLoggedIn) {
    return res.send("<h1>You are logged in amigo :)</h1>");
  } else {
    res.redirect("/");
  }
});

router.post("/logout", session.authProductsSession, (req, res) => {
  req.session.destroy();
  res.send({ message: "Logout successful" });
});

module.exports = router;
