const InventoryModel = require("../models/inventory.model");
const inventoryModel = new InventoryModel();

class InventoryController {
  fetchAllInventoryItems() {
    return inventoryModel.getAllInventoryItems();
  }
}

module.exports = InventoryController;