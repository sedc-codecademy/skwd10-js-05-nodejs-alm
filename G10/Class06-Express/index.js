const express = require("express");
const studentsRouter = require("./routes/students.routes");

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.use("/api", studentsRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is running at port: ${PORT}`);
});
