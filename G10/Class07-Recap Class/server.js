const express = require("express");

const fsService = require("./writeToFile.service.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/pets", (req, res) => {
  const petsArray = [{ name: "Bubi" }, { name: "Markus" }];

  res.send(petsArray);
});

app.get("/people", (req, res) => {
  const people = fsService.readFileSync("random.json");

  res.send(JSON.parse(people));
});

app.post("/people", (req, res) => {
  const personToBeAdded = req.body;
  console.log(personToBeAdded);

  const peopleDb = fsService.readFileSync("random.json");
  const parsedPeopleDB = JSON.parse(peopleDb);
  parsedPeopleDB.push(personToBeAdded);

  fsService.writeToFileSync("random.json", JSON.stringify(parsedPeopleDB));

  res.status(201).send("Created");
});

app.listen(3000, "localhost", () => {
  console.log("Server is up and running on localhost on port 3000");
});
