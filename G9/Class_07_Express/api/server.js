const express = require("express");
const fileSystem = require("./db/file-system");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Middleware
// Request always looks for middleware
app.use(cors());

// The request body, before parsing it with express.json()
// app.post("/animals", (req, res, next) => {
//   console.log(req.body);
//   next();
// })

// Error Handling Middleware
// Error handling middleware does not handle existing errors.
// It creates and throws new errors if the request is bad

// app.post('/login', (req, res, next) => {
//   const {email, password} = req.body;
//   if (!email || !password) {
//     res.status(400).json({
//       message: "Email or Password is invalid!"
//     });
//   }
// });

// These two lines parse the request body from a POST, PUT, PATCH request
// If the request header content-type is JSON (JSON.stringify was used in the fetch request)
// Express.json() will catch it, and use JSON.parse() on the body
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

app.get("/animals/:id", (req, res, next) => {
  const id = req.params.id;
  const animals = JSON.parse(fileSystem.getData("animals.json"));
  const animal = animals.find((animal) => animal.id === id);

  if (!animal) {
    throw new Error("Animal not found!");
  }

  res.send(animal);
});

// POST does Insert
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

// Delete request
// http://localhost:5000/animals/5
// req.params.id;
// Request Parameter
app.delete("/animals/:id", (req, res, next) => {
  const id = req.params.id;
  fileSystem.deleteData(id, "animals.json");
  res.send(
    JSON.stringify({
      id: id,
      deleted: true,
    })
  );
});

// Edit animal by ID
// The request parameters can be found after the colon :
// If express finds a colon in the middlware URL "/animals/:id"
// It will treat it as a request parameter, and it will put the value in req.params with the name we've given it
app.put("/animals/:id", (req, res, next) => {
  const id = req.params.id;
  const animal = req.body;
  const updatedAnimal = fileSystem.updateData(id, animal, "animals.json");
  res.send(updatedAnimal);
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
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, () => {
  console.log("Server is listening http://localhost:5000");
});

// Vercel, Heroku, GoDaddy
// http://myherokuapp:5000
// On heroku, for a free domain, process.env.HOST = myherokuapp.domain_of_your_choice.com
