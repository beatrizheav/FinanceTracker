const db = require("../config/db");

const getAllIncomes = (req, res) => {
  db.query("SELECT * FROM incomes", (err, results) => {
    if (err) {
      console.error("Error fetching incomes:", err);
      return res.status(500).json({ error: "Failed to retrieve incomes" });
    }

    res.json(results);
  });
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
        incomeId: result,
      });
    }
  );
};

module.exports = { createIncome, getAllIncomes };
