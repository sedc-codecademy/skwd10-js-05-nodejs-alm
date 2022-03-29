const router = require('express').Router();
const inventory = require("./routes/inventory.routes");

// This main router will direct the request to the appropriate subroute
// http://localhost:5000/api/inventory
router.use("/inventory", inventory);

module.exports = router;