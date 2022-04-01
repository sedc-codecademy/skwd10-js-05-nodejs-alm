const router = require("express").Router();

const sessionValidator = require("../services/session-validator");

router.get("/products", sessionValidator, (req, res) => {
  const products = [
    { productName: "Orange", price: 40 },
    { productName: "Coffee", price: 100 },
  ];

  res.json(products);
});

module.exports = router;
