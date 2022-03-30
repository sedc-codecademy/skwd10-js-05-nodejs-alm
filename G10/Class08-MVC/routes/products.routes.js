const router = require("express").Router();
const ProductsController = require("../controllers/products.controller");
const productsController = new ProductsController();

router.get("/:id?", async (req, res) => {
	const productId = req.params.id;

	if (!productId) {
		try {
			const productsData = await productsController.fetchAllProducts();
			res.status(200).json(productsData)
		} catch (error) {
			res.status(400).json(error)
		}
	} else {
		try {
			const product = await productsController.fetchProductById(productId)
			res.status(200).json(product)
		} catch (error) {
			res.status(400).send(error)
		}
	}
});

module.exports = router;
