const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

const ac = new AuthController();

router.post("/login", (req, res) => {
  const credentials = req.body;

  if (!credentials.username || !credentials.password) {
    return res.status(400).send({ message: "Bad request my friend" });
  }
  // here we will call the controller =)
  ac.login(credentials)
    .then((response) => {
      console.log(response);
      //user is logged in
      req.session.authenticated = true;
      req.session.isAdmin = response.user.isAdmin;

      console.log("*** SESSION LOGGED IN LOGIN ***");
      console.log(req.session);
      res.status(200).json({ msg: "User is logged in" });
    })
    .catch((error) => {
      res.status(401).json(error);
    });
});

module.exports = router;
