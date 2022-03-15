//core modules that we've met: fs, path
//there are more: http

const http = require("http");
//                                   req     res
const server = http.createServer((request, response) => {
  //   console.log(request);

  // the things that we will need the most are: url, statusCode, method, headers
  //   console.log(request.url, request.statusCode, request.method);

  //url is everything after localhost:3000;

  //very basic response
  //   response.setHeader("Content-type", "text/html");
  //   response.write(`<h1>Hello, this is our first server :)</h1>`);
  //   response.end();

  const url = request.url;
  const method = request.method;
  // '/' is default route
  if (url === "/") {
    //configuring of what type will be the content that we are going to send BACK to the client/the one that made the request
    response.setHeader("Content-type", "text/html");
    response.write(`<h1>Hello, this is our first server :)</h1>`);
    return response.end();
  }
  if (url === "/something") {
    response.setHeader("Content-type", "text/html");
    response.write("<h1>Now we hit /something url </h1>");
    return response.end();
  }
  if (url === "/movies") {
    response.setHeader("Content-type", "text/html");
    response.write("<h1>We are at /movies route</h1>");

    const chunksReceived = [];
    // using .on is as same as using .addEventListener("click", (event) => {})

    /**
     * => .on is method that is BINDED to the request, and will listen to the every
     * request sent.
     *
     * "data" => is the event we TELL .on TO LISTEN TO!
     */
    request.on("data", (chunk) => {
      console.log(chunk);
      chunksReceived.push(chunk);
    });

    request.on("end", () => {
      const parsedData = Buffer.concat(chunksReceived).toString();

      console.log(parsedData);
      const data = parsedData.split("=");
      console.log(data);
      const movieNameReceived = data[1];
      console.log(movieNameReceived.replace("+", " "));
    });

    return response.end();
  }
  if (url === "/add_movie") {
    response.setHeader("Content-type", "text/html");
    response.write(`
    <form action="/movies" method="post">
        <input type="text" name="movieName" />
        <button>Add movie</button>
    </form>
    `);
    return response.end();
  }
});

server.listen(3000);
