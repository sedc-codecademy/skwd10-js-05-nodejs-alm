const router = require("express").Router();
const InventoryController = require("../controllers/inventory.controller");

// This subroute will direct the request to the appropriate controller middleware function

// http://localhost:5000/api/animals
// http://localhost:5000/api/animals/1
// METHOD: @GET

router.get("/:id?", (req, res) => {
  if (req.params && req.params.id) {
    // the name of the query param in the route will define the name of the property in req.params
    // So for example :/email? it means req.params.email
    const itemId = req.params.id;
    inventoryController
      .fetchInventoryItemById(itemId)
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  } else {
    inventoryController
      .fetchAllInventoryItems()
      .then((items) => {
        res.status(200).json(items);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});

router.post("/", (req, res) => {
  const item = req.body;
  inventoryController.postInventoryItem(item).then((response) => {
    res.status(200).json(response);
  });
});

router.delete("/:id?", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({
      message: "Error! You didn't provide an ID!",
    });
  } else {
    inventoryController.deleteInventoryItem(id).then((response) => {
      res.status(200).json(response);
    });
  }
});

router.put("/:id?", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  if (!itemId || !updatedItem) {
    res.status(400).json({
      message: "Insufficient data! Cannot update!",
    });
  } else {
    inventoryController
      .updateInventoryItem(itemId, updatedItem)
      .then((response) => {
        res.status(200).json(response);
      });
  }
});

const inventoryController = new InventoryController();
module.exports = router;
