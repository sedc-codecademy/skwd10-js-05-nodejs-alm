const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();
const { v4: uuidv4 } = require("uuid");

// [Cookies]
router.post("/login", (req, res) => {
  const credentials = req.body;
  const session_id = uuidv4();
  process.env.session_id = session_id;

  if (credentials && credentials.username && credentials.password) {
    authController
      .loginUser(credentials)
      .then((response) => {
        // Standard way of creating a cookie
        // res.setHeader("set-cookie", `session_id: ${session_id}`);
        res.cookie("session_id", session_id);
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  }
});

module.exports = router;