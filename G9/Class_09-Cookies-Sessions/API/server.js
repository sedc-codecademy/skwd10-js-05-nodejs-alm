const express = require("express");
const cors = require("cors");
const customCors = require("./const/cors.const");
const cookieParser = require("cookie-parser");
const router = require("./const/router.const");
const session = require("./const/session.const");

const app = express();

// app.use(cors());
app.use(customCors);
app.use(session);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.use("/api", router);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to our SEDC API!",
  });
});

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400).json({
//       message: "Missing credentials!",
//     });
//   } else {
//     res.status(200).json({
//       message: "You have been logged in!",
//     });
//   }
// });

app.listen(PORT, HOST, () => {
  console.log("Server is listening on http://localhost:5000/");
});
