const express = require("express");
const router = express.Router();

//query params
router.get("/names", (req, res) => {
  /**
   * to extract query parametar we must do it with req.query;
   *
   * to use and provide such queries we must use:
   *
   * localhost:3000/names?key=value
   */

  //the data structure of the query is object
  console.log(req.query);
  console.log(req.body);
  console.log(req.params);
  const nameProvidedOfQuery = req.query.firstName;
  console.log(nameProvidedOfQuery);
  res.send("<h1>Okay we are at names route =)</h1>");
});

module.exports = router;
