const http = require("http");
const axios = require("axios");
// const mathService = require("./test.js");
// console.log(mathService.sumTwoNumbers(10, 20));
// console.log(mathService.multiplyTwoNumbers(10, 20));
const requestListener = async (req, res) => {
  // console.log(req);
  // res.write("HI THERE");
  const person = await axios.get("https://swapi.dev/api/people/1/");

  res.write("<html>");
  res.write(`<h1> ${person.data.name} </h1>`);
  res.write(`<p>Height: ${person.data.height}</p>`);
  res.write("<h4> Whatever</h4>");
  res.write("</html>");
  res.end();

  // process.exit();
};

const server = http.createServer(requestListener);

server.listen(1500);
