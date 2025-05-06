const db = require("../config/db");

const getAllIncomes = (req, res) => {
  const userId = req.user.userId;

  db.query(
    "SELECT * FROM incomes WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching incomes:", err);
        return res.status(500).json({ error: "Failed to retrieve incomes" });
      }

      res.json(results);
    }
  );
};

const createIncome = (req, res) => {
  const { user_id, name, amount, date, fixed } = req.body;

  if (!user_id || !name || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO incomes (user_id, name, amount, date, fixed)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [user_id, name, amount, date, fixed ?? false],
    (err, result) => {
      if (err) {
        console.error("Error inserting income:", err);
        return res.status(500).json({ error: "Failed to create income" });
      }

      res.status(201).json({
        message: "Income created successfully",
        incomeId: result.insertId,
      });
    }
  );
};

const getBalance = (req, res) => {
  const userId = req.user.userId;

  const query = `
    SELECT
      (SELECT IFNULL(SUM(amount), 0) FROM incomes WHERE user_id = ?) AS totalIncome,
      (SELECT IFNULL(SUM(amount), 0) FROM expenses WHERE user_id = ?) AS totalExpenses
  `;

  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      console.error("Error fetching balance:", err);
      return res.status(500).json({ error: "Failed to fetch balance" });
    }

    const { totalIncome, totalExpenses } = results[0];
    res.json({ totalIncome, totalExpenses });
  });
};

const getIncomesByUser = (req, res) => {
  const userId = req.user.userId;

  db.query(
    "SELECT * FROM incomes WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching incomes:", err);
        return res.status(500).json({ error: "Failed to retrieve incomes" });
      }

      res.json(results);
    }
  );
};

module.exports = {
  createIncome,
  getAllIncomes,
  getBalance,
  getIncomesByUser,
};
