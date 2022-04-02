const express = require("express");
const studentsRouter = require("./routes/students.routes");
const path = require("path");
const cors = require("cors");

const staticFolderPath = path.join(__dirname, "public");
const staticFolderPathTwo = path.join(__dirname, "publicTwo");

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Our server can accept JSON formats =) in the request
app.use(express.json());
// Allows our server to be accessable =)
// We can put rules on who can access our server

// www.facebook.com are allowed to access the server =).
app.use(cors());

app.use("/api", studentsRouter);

app.use("/static-page", express.static(staticFolderPath));
app.use("/static-page-two", express.static(staticFolderPathTwo));

app.listen(PORT, HOST, () => {
  console.log(`Server is running at port: ${PORT}`);
});
