const InventoryModel = require("../models/inventory.model")
const inventoryModel = new InventoryModel()

class InventoryController {
	fetchAllInventoryItems () {
		return inventoryModel.getAllInventoryItems()
	}

	fetchInventoryItemById(itemId) {
		return inventoryModel.getInventoryItemById(itemId)
	}

	postInventoryItem(itemObj) {
		return inventoryModel.insertNewInventoryItem(itemObj)
	}

	updateInventoryItem(itemId, updatesObj) {
		return inventoryModel.putInventoryItem(itemId,updatesObj)
	}

	deleteInventoryItem(itemId) {
		return inventoryModel.deleteInventoryItem(itemId)
	}

}

module.exports = InventoryController