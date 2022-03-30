const path = require("path");
const dataService = require("../services/data.service");
const { v4: uuid } = require("uuid");

const inventoryPath = path.join(__dirname, "..", "data", "inventory.json");

class InventoryModel {
	getAllInventoryItems() {
		return new Promise((resolve, reject) => {
			const inventoryData = dataService.readDataFromDb(inventoryPath);
			resolve(JSON.parse(inventoryData));
		});
	}

	getInventoryItemById(itemId) {
		return new Promise((resolve, reject) => {
			const inventoryData = JSON.parse(
				dataService.readDataFromDb(inventoryPath)
			);

			const foundItem = inventoryData.inventory.find(
				item => item.id === itemId
			);

			if (foundItem) {
				resolve(foundItem);
			} else {
				reject({
					message: "Error! No item found!",
				});
			}
		});
	}

	insertNewInventoryItem(itemObj) {
		return new Promise((resolve, reject) => {
			//Read the data from the db
			const inventoryData = JSON.parse(
				dataService.readDataFromDb(inventoryPath)
			);
			//Creating a new item with a new uuid
			const newItem = { id: uuid(), ...itemObj };
			//Adding the item to the inventory array
			inventoryData.inventory.push(newItem);
			//Saving the updated inventory in db
			dataService.writeDataToDb(
				inventoryPath,
				JSON.stringify(inventoryData)
			);

			resolve({
				message: "Item added successfully!"
			})
		});
	}

	putInventoryItem(itemId,updatesObj) {
		return new Promise((resolve,reject)=> {
			//Read data from db
			const inventoryData = JSON.parse(
				dataService.readDataFromDb(inventoryPath)
			);
			//Using for each to update the item
			inventoryData.inventory.forEach(item => {
				if(item.id === itemId){
					item.title = updatesObj.title,
					item.price = updatesObj.price
				}
			})
			//Saving the updated inventory in db
			dataService.writeDataToDb(
				inventoryPath,
				JSON.stringify(inventoryData)
			);
			resolve({
				message: "Item updated successfully!"
			})

		})

	}

	deleteInventoryItem(itemId) {
		return new Promise ((resolve,reject) => {
			//Read data from db
			const inventoryData = JSON.parse(
				dataService.readDataFromDb(inventoryPath)
			);

			const filteredInventory = inventoryData.inventory.filter(item => item.id !== itemId)
			inventoryData.inventory = filteredInventory

			//Saving the updated inventory in db
			dataService.writeDataToDb(
				inventoryPath,
				JSON.stringify(inventoryData)
			);

			resolve({
				message: "Item deleted successfully!"
			})
		})
	}
}

module.exports = InventoryModel;
