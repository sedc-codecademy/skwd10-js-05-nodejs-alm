const router = require("express").Router();
const inventoryRouter = require("./routes/inventory.routes");
const productsRouter = require("./routes/products.routes");
const authRouter = require("./routes/auth.routes");

const {
  validateUser,
  validateAdminUser,
} = require("./services/session-validator");

router.use("/inventory", validateUser, inventoryRouter);
router.use("/products", validateAdminUser, productsRouter);
router.use("/auth", authRouter);

module.exports = router;
