const express = require("express");
const cors = require("cors");
const app = express();
const authenticate = require("./middleware/authenticate");
const upload = require("./middleware/multer"); // Aquí se importa la configuración de multer

//Controllers
const userController = require("./controllers/userController");
const incomeController = require("./controllers/incomeController");
const categoriesController = require("./controllers/categoriesController");
const expenseController = require("./controllers/expenseController");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Route Test
app.get("/test", userController.getAllUsers);

// Routes Users
app.get("/users", userController.getAllUsers);
app.post("/user", userController.createUser);
app.post("/user/login", userController.loginUser);

// Routes Incomes
app.get("/incomes", authenticate, incomeController.getAllIncomes);
app.post("/incomes/add", incomeController.createIncome);
app.get("/incomes/balance", authenticate, incomeController.getBalance);
app.get("/incomes/user", authenticate, incomeController.getIncomesByUser);

// Routes Categories
app.get(
  "/categories/get",
  authenticate,
  categoriesController.getUserCategories
);
app.post("/category/add", authenticate, categoriesController.createCategory);

//Routes Expenses
app.get("/expenses/get", expenseController.getAllExpenses);
app.post(
  "/expenses/add",
  authenticate,
  upload.single("image"),
  expenseController.createExpense
);

const PORT = process.env.PORT || 5001;
app.listen(5001, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
