const express = require("express");

// cors
const cors = require("cors");

// import untuk memproses env
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(cors());

// menentukan port dari env
const PORT = process.env.PORT;

// untuk parsing request body
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

// Layer untuk handle request dan response
const studentsController = require("./student/student.controller");

app.use("/students", studentsController);

app.listen(PORT, () => {
  console.log("Express API Running on Port: " + PORT);
});
