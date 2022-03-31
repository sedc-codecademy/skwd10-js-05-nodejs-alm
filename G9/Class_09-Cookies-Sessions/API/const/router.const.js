const router = require("express").Router();
const auth = require("../routes/auth.routes");
const user = require("../routes/user.routes");

router.use("/auth", auth);
router.use("/user", user);

module.exports = router;
