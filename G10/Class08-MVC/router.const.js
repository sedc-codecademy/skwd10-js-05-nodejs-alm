const router = require("express").Router()
const inventoryRouter = require("./routes/inventory.routes")
const productsRouter = require("./routes/products.routes")

router.use("/inventory",inventoryRouter)
router.use("/products", productsRouter)

module.exports = router