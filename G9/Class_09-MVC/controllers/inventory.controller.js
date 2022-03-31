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

  deleteInventoryItem(itemId) {
    return inventoryModel.deleteInventoryItem(itemId);
  }

  updateInventoryItem(id, body) {
    return inventoryModel.putInventoryItem(id, body);
  }
}

module.exports = InventoryController;
