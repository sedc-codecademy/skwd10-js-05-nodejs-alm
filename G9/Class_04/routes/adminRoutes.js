const express = require("express");
const router = express.Router();

router.get("/product", (req, res, next) => {
  const query = req.query;
  console.log(req.query);
  let products = [
    { id: "1", name: "car" },
    { id: "2", name: "chips" },
    { id: "3", name: "laptop" },
    { id: "4", name: "car" },
  ];

  let filteredProducts = products.filter(
    (product) => product.name === query.name
  );
  res.send(filteredProducts);
});

router.get("/product/:id", (req, res) => {
  let products = [
    { id: "1", name: "car" },
    { id: "2", name: "chips" },
    { id: "3", name: "laptop" },
    { id: "4", name: "car" },
  ];

  const product = products.find((product) => product.id === req.params.id);
  res.send(product);
});

router.post("/product", (req, res) => {
  try {
    if (!req.body) {
      throw new Error("No body defined");
    }
    console.log(req.body);
    res.redirect("/product");
  } catch (error) {
    res.statusCode = 400;
    res.send("Missing body");
  }
});

module.exports = router;
