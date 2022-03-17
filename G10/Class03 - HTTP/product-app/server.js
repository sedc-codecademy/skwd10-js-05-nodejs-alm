const http = require("http");
const fs = require("fs");
const path = require("path");

//                                  req      res
const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  );

  // localhost:3000/
  if (url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write(`<h1>Hello World</h1>`);
    return response.end();
  }
  //localhost:3000/products
  if (url === "/products" && method === "GET") {
    response.setHeader("Content-Type", "application/json");

    const productsPath = path.join(__dirname, "db", "products.json");

    const productsData = fs.readFileSync(productsPath, { encoding: "utf-8" });

    return response.end(productsData);
  }

  if (url === "/products" && method === "POST") {
    const productsPath = path.join(__dirname, "db", "products.json");

    // Javascript object notation = JSON
    const chunksReceived = [];
    console.log("Inside post IF statement", method);

    //myBtn.addEventListener("click", (event))
    request.on("data", (chunk) => {
      // chunk is the data that has been sent to our server :)
      console.log(chunk);
      chunksReceived.push(chunk);
    });

    request.on("end", () => {
      const parsedData = Buffer.concat(chunksReceived).toString();

      const productsData = fs.readFileSync(productsPath, { encoding: "utf-8" });
      const parsedProductsData = JSON.parse(productsData);

      // The product that was sent to us;
      const parsedJsonProduct = JSON.parse(parsedData);
      console.log(parsedJsonProduct);
      parsedProductsData.products.push(parsedJsonProduct);

      const stingifiedProductsToBeSaved = JSON.stringify(parsedProductsData);

      //write to real db =)
      fs.writeFileSync(productsPath, stingifiedProductsToBeSaved, {
        encoding: "utf-8",
      });
    });

    return response.end();
  } else {
    // response.setHeader("Content-Type", "text/html");
    // response.write(`<h1>ROUTE IS NOT EXISTING</h1>`);

    response.statusCode = 302;
    response.setHeader("Location", "/");
    return response.end();
  }
});

// server.listen(3000)

server.listen(3000, "localhost", () => {
  console.log(`Server is up and running, on port ${3000}`);
});
