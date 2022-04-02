const router = require("express").Router();
const InventoryController = require("../controllers/inventory.controller");

const inventoryController = new InventoryController();

router.get("/:id?", (req, res) => {
	const itemId = req.params.id;

	if (itemId) {
		inventoryController
			.fetchInventoryItemById(itemId)
			.then(item => res.status(200).json(item))
			.catch(err => res.status(400).json(err));
	} else {
		inventoryController
			.fetchAllInventoryItems()
			.then(data => res.status(200).json(data))
			.catch(err => res.status(400).json(err));
	}
});

router.post("/add", (req, res) => {
	const newItem = req.body;
	inventoryController
		.postInventoryItem(newItem)
		.then(response => res.status(201).json(response))
		.catch(err => res.status(400).json(err));
});

router.put("/:id/update", (req, res) => {
	const itemId = req.params.id;
	const updates = req.body;

	if (updates) {
		inventoryController
			.updateInventoryItem(itemId, updates)
			.then(response => res.status(200).json(response))
			.catch(err => res.status(400).json(err));
	} else {
		res.status(400).json({ message: "No request body found!" });
	}
});

router.delete("/:id", (req, res) => {
	const itemId = req.params.id;

	inventoryController
		.deleteInventoryItem(itemId)
		.then(response => res.status(200).json(response))
		.catch(err => res.status(400).json(err));
});

module.exports = router;
