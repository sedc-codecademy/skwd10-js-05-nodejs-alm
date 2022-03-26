const express = require("express");
const fileSystem = require("./db/file-system");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Middleware
app.use(cors());

// The request body, before parsing it with express.json()
// app.post("/animals", (req, res, next) => {
//   console.log(req.body);
//   next();
// })

// These two lines parse the request body from a POST, PUT, PATCH request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http:/localhost:5000/animals

app.get("/animals", (req, res, next) => {
  // 1. Read text from the database
  let animalsStringData = fileSystem.getData("animals.json");
  // 2. Convert text to JS object/array
  let animals = JSON.parse(animalsStringData);

  // We can send a query parameter from the front end
  // to define whether we want a specific number of items
  // http://localhost:5000/animals?pageSize=5
  /* req = {
    method: "GET",
    body: {},
    query: {
      pageSize: 5
    }
  }
  */
  if (req.query.pageSize) {
    animals = animals.slice(0, parseInt(req.query.pageSize));
  }

  // We can send a query paramter from the front end
  // to define whether we want to receive the data sorted
  if (req.query.sortBy) {
    animals.sort((first, second) =>
      first[req.query.sortBy].localeCompare(second[req.query.sortBy])
    );
  }
  res.send(animals);
  //res.status(200).json(animals);
});

app.post("/animals", (req, res, next) => {
  console.log(req.body);

  // Create an object from the request body
  const animal = {
    imgSrc: req.body.imgSrc,
    animalName: req.body.animalName,
    description: req.body.description,
    id: uuidv4(),
  };

  // Write the object in the database
  fileSystem.addData(animal, "animals.json");

  // Send a response back to the Front End
  res.send({
    message: "Thanks for your input!",
  });
});

// Simple GET request
app.get("/", (req, res, next) => {
  // Read from the Database
  const carouselImages = fileSystem.getData("carousel-images.json");
  // Send the contents of the database back to the Front End
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
