const express = require("express");
const cors = require("cors");
const app = express();
const authenticate = require("./middleware/authenticate");
const userController = require("./controllers/userController");
const categoriesController = require("./controllers/categoriesController");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Users
app.get("/test", userController.getAllUsers);
app.post("/user", userController.createUser);

app.get(
  "/categories/get",
  authenticate,
  categoriesController.getUserCategories
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
