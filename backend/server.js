const express = require("express");
const cors = require("cors");
const app = express();
const userController = require("./controllers/userController");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Users
app.post("/user/login", userController.loginUser);
app.get("/testok", (req, res) => {
  res.send("GET test ok");
});

const PORT = process.env.PORT || 5001;
app.listen(5001, '0.0.0.0',() => {
  console.log(`Server is running on port ${PORT}`);
});
