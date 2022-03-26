const textService = require("../textService");
const { v4: uuidv4 } = require("uuid");

class InventoryModel {
  getAllInventoryItems() {
    return new Promise((resolve, reject) => {
      const text = textService.readDataFromDb("inventory.json");
      resolve(JSON.parse(text));
    });
  }
}

module.exports = InventoryModel;
