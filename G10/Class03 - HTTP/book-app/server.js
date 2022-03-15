console.log("Server file");

const http = require("http");

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write(`<h1>Hello World</h1>`);
    return response.end();
  }
  if (url === "/products" && method === "GET") {
    response.setHeader("Content-Type", "application/json");

    const productOne = {
      productName: "Milka",
      productPrice: "50mkd",
      date: "20.05.2022",
    };

    const productOneStringified = JSON.stringify(productOne);
    console.log(productOneStringified);

    return response.end(productOneStringified);
  }
  if (url === "/products" && method === "POST") {
    const chunksReceived = [];

    request.on("data", (chunk) => {
      chunksReceived.push(chunk);
    });
    request.on("end", () => {
      const parsedData = Buffer.concat(chunksReceived).toString();

      console.log(parsedData);

      const parsedJsonProduct = JSON.parse(parsedData);
      console.log(parsedJsonProduct);
      //from here, we can store this information/json into a database or anyother place :)
    });

    return response.end();
  }
});

server.listen(3000, "localhost", () => {
  console.log(`Server is up and running, on port ${3000}`);
});
