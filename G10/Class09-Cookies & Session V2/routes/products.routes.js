const router = require("express").Router();
const { authProductsSession } = require("../sessions/sessions.const");

const sessionValidator = require("../services/session-validator");

router.get("/products", authProductsSession, sessionValidator, (req, res) => {
  const products = [
    { productName: "Orange", price: 40 },
    { productName: "Coffee", price: 100 },
  ];

  console.log("products route", req.session);
  res.json(products);
});

router.get("/products/:name", authProductsSession, (req, res) => {
  const name = req.params.name;
  const products = [
    { productName: "Orange", price: 40 },
    { productName: "Coffee", price: 100 },
  ];

  const product = products.find((product) => product.productName === name);
  res.json(product);
});
module.exports = router;
