const express = require("express");
const fileSystem = require("./db/file-system");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http:/localhost:5000/animals
app.get("/animals", (req, res, next) => {

  // 1. Read text from the database
  let animalsStringData = fileSystem.getData("animals.json");
  // 2. Convert text to JS object/array
  let animals = JSON.parse(animalsStringData);

  if (req.query.pageSize) {
    animals = animals.slice(0, parseInt(req.query.pageSize));
  }

  if (req.query.sortBy) {
    animals.sort((first, second) =>
      first[req.query.sortBy].toLocaleCompare(second[req.query.sortBy])
    );
  }

    // const person = {
    //   name: "Ivan",
    //   town: "Skopje",
    // };

    //These two are the same
    // console.log(person.name);
    // console.log(person['name']);

  res.send(animals);
//res.status(200).json(animals);
});

app.get("/", (req, res, next) => {
  const carouselImages = fileSystem.getData("carousel-images.json");
  res.send(carouselImages);
});

// [CALLBACKS]
// function math(firstNumber, secondNumber, callbackFn) {
//   callbackFn();
//   return firstNumber + secondNumber;
// }

// function exampleCallback() {
//   console.log("I am a callback!");
// }

// math(5, 4, exampleCallback);

// math(5, 4, () => {
//   console.log("I am a callback!");
// });

// app.use("/animals", (req, res, next) => {
//   console.log(process.env);
//   console.log(__dirname);
//   res.status(200).json({
//     message: "Everything is fine!",
//     data: [
//       {
//         id: 1,
//         name: "Tiger",
//       },
//       {
//         id: 2,
//         name: "Lion",
//       },
//     ],
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening http://localhost:5000");
});
