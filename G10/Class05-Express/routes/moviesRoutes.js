const express = require("express");
const router = express.Router();

// with .get() we are setting that the route provided (in our case / default one) is going to be of GET method
router.get("/", (req, res) => {
  res.send("<h1>Hello from our express server =)</h1>");
});

router.get("/something", (req, res) => {
  res.send("<h1>This is something route =)</h1>");
});

router.get("/movies", (req, res) => {
  res.send("<h1>This is movies route =)</h1>");
});

router.post("/movies", (req, res) => {
  console.log("FULL REQUEST BODY:", req.body);
  const movieName = req.body.movieName;
  console.log("Movie name is:", movieName);
  res.redirect("/");
});

router.get("/add_movie", (req, res) => {
  res.send(`
      <form action="/movies" method="post">
      <input type="text" name="movieName" />
      <button>Add movie</button>
  </form>
      `);
});

router.post("/add_movie", (req, res) => {
  console.log("Body sent to the server", req.body);
  /**
   * ..code//
   * here we create the movie =)
   */
  res.status(201).send({ msg: "Movie is created" });
});

//path parametar
router.get("/movies/:id", (req, res) => {
  console.log(req.params);
  console.log("Id parametar", req.params.id);
  const idRequested = req.params.id;

  const movieDb = [
    { id: "1", name: "Harry Potter" },
    { id: "2", name: "Shawshenk Redemtion" },
  ];

  const movieFound = movieDb.find((movie) => movie.id === idRequested);

  if (movieFound) {
    res.send(movieFound);
  } else {
    res.status(404).send({ err: "Movie not found" });
  }
});

module.exports = router;
