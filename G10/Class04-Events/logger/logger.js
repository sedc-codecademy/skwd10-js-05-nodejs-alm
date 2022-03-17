const fs = require("fs");
const path = require("path");

//Init emitter
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

//Path and data for stats.json
const statsPath = path.join(__dirname, "stats.json");
const statsData = JSON.parse(fs.readFileSync(statsPath, { encoding: "utf-8" }));

//Path for logs.txt
const logsPath = path.join(__dirname, "logs.txt");

console.log(statsData);

//Function that logs to the txt file
const logProduct = productData => {
  fs.appendFileSync(
    logsPath,
    `Name: ${productData.productName}\nPrice: ${
      productData.productPrice
    }\nDate Added: ${new Date()}\n${"=".repeat(80)}\n`
  );
  console.log("Product Logged Event");
};

//adding logging events
emitter
  .on("request", () => {
    statsData.totalRequests += 1;
    fs.writeFileSync(statsPath, JSON.stringify(statsData));
    console.log("Request Event");
  })
  .on("log-product", logProduct)
  .on("product-added", productData => {
    statsData.productsAdded += 1;

    //emitting log product from inside product-added
    emitter.emit("log-product", productData);

    fs.writeFileSync(statsPath, JSON.stringify(statsData));
    console.log("Product Added Event");
  });

module.exports = emitter;
