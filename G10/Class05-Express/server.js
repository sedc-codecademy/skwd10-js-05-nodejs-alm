/**
 * Express to the rescue =)
 *
 * Express is a framework.
 * What is a framework?
 * It has many helper function/methods.
 *
 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const moviesRoutes = require("./routes/moviesRoutes.js");
const namesRoutes = require("./routes/namesRoutes.js");

//Middleware
/**
 * Middleware is an interceptor that intercepts every request done to our server.
 *
 * It is the same as customs control when we pass border =)
 * It checks every person that  tries to pass the border =)
 *
 * The middleware checks every request done to our server =)
 */

//We can use the middleware to log,autheticate, print dates and so on =)

// app.use((req, res, next) => {
//   // Authenticate
//   // Check date
//   // Log something
//   console.log("We are at our first middleware");

//   next(); // next is enabling the app to reach following logic or next middleware
// });

//Here we use middleware to print the date of the request made to the server =)
app.use((req, res, next) => {
  console.log("We are at our second middleware");
  console.log("Request was made at", new Date().toISOString());
  next(); // next is enabling the app to reach following logic or next middleware
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(moviesRoutes);
app.use(namesRoutes);

// * is WILDCARD and means ALL/EVERYTHING
app.get("*", (req, res) => {
  res.status(404).send({ err: "PAGE NOT FOUND" });
});

app.listen(3000, "localhost", () => {
  console.log(`SERVER IS UP AND RUNNING ON PORT ${3000}`);
});
