/**
 * Express to the rescue =)
 *
 * Express is a framework.
 * What is a framework?
 * It has many helper function/methods.
 *
 */

const express = require("express");

const app = express();

// with .get() we are setting that the route provided (in our case / default one) is going to be of GET method
app.get("/", (req, res) => {
  res.send("<h1>Hello from our express server =)</h1>");
});

app.get("/something", (req, res) => {
  res.send("<h1>This is something route =)</h1>");
});

/**
 * The get route should be called: /add_movie
 * 
 *   <form action="/movies" method="post">
        <input type="text" name="movieName" />
        <button>Add movie</button>
    </form>
 * 
 */

app.listen(3000, "localhost", () => {
  console.log(`SERVER IS UP AND RUNNING ON PORT ${3000}`);
});
