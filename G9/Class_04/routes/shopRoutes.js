const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'><input type='text' name='book'/><button type='submit'>SUBMIT</button> </form>"
  );
});

module.exports = router;
