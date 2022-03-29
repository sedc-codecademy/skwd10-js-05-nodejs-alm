const InventoryModel = require("../models/inventory.model");
const inventoryModel = new InventoryModel();

class InventoryController {
  fetchAllInventoryItems() {
    return inventoryModel.getAllInventoryItems();
  }

  fetchInventoryItemById(itemId) {
    return inventoryModel.getInventoryItemById(itemId);
  }

  postInventoryItem(item) {
    return inventoryModel.insertNewInventoryItem(item);
  }
}

module.exports = InventoryController;