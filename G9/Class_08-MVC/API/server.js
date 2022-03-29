const express = require("express");
const cors = require("cors");
const router = require("./router.const");

const app = express();

// Front End/Client Side requests start here.

app.use(cors());
// It parses incoming requests with JSON payloads and is based on body-parser.
// This parser accepts any Unicode encoding of the body
app.use(express.json());
// This parser accepts only UTF-8 encoding of the body
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

// This line will send the request to the main router
app.use("/api", router);

app.use("/subapi", (req, res, next) => {
  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const filteredArray = numberArray.filter((number) => {
    if (number === 15) {
      return true;
    } else {
      return false;
    }
  });
  const result = {
    filteredArray,
    message: "This is your filtered array.",
  };
  res.status(200).json(result);
});

app.listen(PORT, HOST, () => {
  console.log("Server is listening at http://localhost:5000/");
});
