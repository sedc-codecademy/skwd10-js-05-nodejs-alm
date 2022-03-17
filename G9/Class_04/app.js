// const http = require("http");

// const server = http.createServer((req, res) => {
//   // console.log(req);
//   if (req.url == "/") {
//     res.setHeader("Content-Type", "text/html");
//     return res.end(
//       "<form action='/product' method='POST'><input type='text' name='book'/><button type='submit'>SUBMIT</button> </form>"
//     );
//   }
//   if (req.url == "/product" && req.method == "POST") {
//     let chunks = [];
//     req.on("data", (chunk) => {
//       chunks.push(chunk);
//     });
//     req.on("end", () => {
//       // console.log(chunks);
//       const dataString = Buffer.concat(chunks).toString();
//       const splitedData = dataString.split("=");
//       const result = { [splitedData[0]]: splitedData[1] };
//       console.log(result);
//       return res.end("<h1>SUCCESS</h1>");
//     });
//   }
//   console.log("URL: ", req.url);
//   console.log("METHOD: ", req.method);
//   res.end("THIS IS OUR RESPONSE");
// });

// server.listen(3000);

// EXPRESS

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const adminRoutes = require("./routes/adminRoutes.js");
const shopRoutes = require("./routes/shopRoutes.js");
//Midlawers

app.use((req, res, next) => {
  // Authentiation validation
  console.log("Date: ", Date.now());
  next();
});

// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use("/this-is-static", express.static(path.join(__dirname, "public")));

app.listen("3000");
