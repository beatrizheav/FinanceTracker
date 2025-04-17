const express = require("express");
const cors = require("cors");
const app = express();
const userController = require("./controllers/userController");
const incomeController = require("./controllers/incomeController");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Users
app.get("/users", userController.getAllUsers);
app.post("/incomes/add", incomeController.createIncome);
app.get("/incomes", incomeController.getAllIncomes);
app.get("/test", userController.getAllUsers);
app.post("/user", userController.createUser);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
