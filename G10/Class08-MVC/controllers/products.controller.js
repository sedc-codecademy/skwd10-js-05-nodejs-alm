//Two lines that are mandatory when importing and using models and controllers
const ProductsModel = require("../models/products.model")
const productsModel = new ProductsModel()

class ProductsController {
	fetchAllProducts () {
		return productsModel.getAllProducts()
	}
	fetchProductById (productId) {
		return productsModel.getProductById(productId)
	}
}

module.exports = ProductsController