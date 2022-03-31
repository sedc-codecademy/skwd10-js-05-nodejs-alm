const textService = require("../textService");
const { v4: uuidv4 } = require("uuid");

class InventoryModel {
  // @GET
  getAllInventoryItems() {
    return new Promise((resolve, reject) => {
      const text = textService.readDataFromDb("inventory.json");
      if (!text) {
        reject({
          message: "No data available!",
        });
      }
      resolve(JSON.parse(text));
    });
  }

  getInventoryItemById(itemId) {
    return new Promise((resolve, reject) => {
      const text = textService.readDataFromDb("inventory.json");
      const data = JSON.parse(text);
      const item = data.inventory.filter((item) => item.id === itemId)[0];

      // const item2 = data.inventory.filter((item) => {
      //   if (item.id === itemId) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });

      if (item) {
        resolve(item);
      } else {
        reject({
          message: "Error! No such item found!",
        });
      }
    });
  }

  insertNewInventoryItem(item) {
    return new Promise((resolve, reject) => {
      item.id = uuidv4();
      const dbDataText = textService.readDataFromDb("inventory.json");
      const dbData = JSON.parse(dbDataText);
      dbData.inventory.push(item);
      const dbDataStringified = JSON.stringify(dbData);
      textService.writeDataToDb("inventory.json", dbDataStringified);
      resolve({
        message: "Item sucessefully added!",
      });
    });
  }

  deleteInventoryItem(itemId) {
    return new Promise((resolve, reject) => {
      const dbDataText = textService.readDataFromDb("inventory.json");
      const dbData = JSON.parse(dbDataText);

      const filtered = dbData.inventory.filter((item) => item.id !== itemId);

      dbData.inventory = filtered;

      const dbDataStringified = JSON.stringify(dbData);
      textService.writeDataToDb("inventory.json", dbDataStringified);

      resolve({
        message: `Item ${itemId} successfully deleted!`,
      });
    });
  }

  putInventoryItem(id, body) {
    return new Promise((resolve, reject) => {
      const dbDataText = textService.readDataFromDb("inventory.json");
      const dbData = JSON.parse(dbDataText);

      dbData.inventory.forEach((item) => {
        if (item.id === id) {
          item.price = body.price;
          item.title = body.title;
        }
      });

      const stringifiedData = JSON.stringify(dbData);
      textService.writeDataToDb("inventory.json", stringifiedData);

      resolve({
        message: `Item ${id} was updated!`,
      })
    });
  }
}

module.exports = InventoryModel;
