const express = require("express");
const cors = require("cors");
const app = express();
const authenticate = require("./middleware/authenticate");
const userController = require("./controllers/userController");
const incomeController = require("./controllers/incomeController");
const categoriesController = require("./controllers/categoriesController");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Users
app.get("/users", userController.getAllUsers);
app.post("/incomes/add", incomeController.createIncome);

// 🔒 Protect these routes with authentication
app.get("/incomes", authenticate, incomeController.getAllIncomes);
app.get("/incomes/balance", authenticate, incomeController.getBalance);

app.get("/test", userController.getAllUsers);
app.post("/user", userController.createUser);
app.post("/user/login", userController.loginUser);

app.get(
  "/categories/get",
  authenticate,
  categoriesController.getUserCategories
);

const PORT = process.env.PORT || 5001;
app.listen(5001, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
