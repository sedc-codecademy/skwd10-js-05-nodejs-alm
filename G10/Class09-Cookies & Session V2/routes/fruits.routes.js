const router = require("express").Router();
const { fruitsSession } = require("../sessions/sessions.const");

router.get("/fruits", fruitsSession, (req, res) => {
  const fruits = [
    { fruitName: "Orange", price: 50 },
    { fruitsName: "Mango", price: 100 },
    { fruitsName: "Strawberries", price: 85 },
  ];

  req.session.fruits = fruits;
  console.log("FRUITS SESSION", req.session.loggedIn);
  console.log(req.session);
  res.json(fruits);
});

module.exports = router;
