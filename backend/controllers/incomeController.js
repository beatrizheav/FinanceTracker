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

const editIncome = (req, res) => {
  const { id, name, amount, date, fixed } = req.body;

  if (!id) {
    return res.status(400).json({ error: "income id are required" });
  };

  const fields = [];
  const values = [];

  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name);
  }

  if (amount !== undefined) {
    fields.push("amount = ?");
    values.push(amount);
  }

  if (date !== undefined) {
    fields.push("date = ?");
    values.push(date);
  }

  if (fixed !== undefined) {
    fields.push("fixed = ?");
    values.push(fixed);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  const query = `
    UPDATE incomes 
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  values.push(id);

  db.query(
    query,
    values,
    (err, result) => {
      if (err) {
        console.error("Error editing income:", err);
        return res.status(500).json({ error: "Failed to edit income" });
      }

      res.status(201).json({
        message: "Income edited successfully",
      });
    }
  );
};

const getBalance = (req, res) => {
  const userId = req.user.userId;
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ error: "month and year are required" });
  }

  const formattedMonth = month.toString().padStart(2, "0");

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const lastDay = getLastDayOfMonth(year, parseInt(formattedMonth));

  const startDate = `${year}-${formattedMonth}-01`;
  const endDate = `${year}-${formattedMonth}-${lastDay}`;

  const query = `
    SELECT
      (
        SELECT IFNULL(SUM(amount), 0)
        FROM incomes
        WHERE user_id = ?
          AND (
            (fixed = 0 AND date BETWEEN ? AND ?)
            OR
            (fixed = 1 AND date <= ?)
          )
      ) AS totalIncome,
      (
        SELECT IFNULL(SUM(amount), 0)
        FROM expenses
        WHERE user_id = ?
          AND (
            (fixed = 0 AND date BETWEEN ? AND ?)
            OR
            (fixed = 1 AND date <= ?)
          )
      ) AS totalExpenses
  `;

  db.query(
    query,
    [userId, startDate, endDate, endDate, userId, startDate, endDate, endDate],
    (err, results) => {
      if (err) {
        console.error("Error fetching balance:", err);
        return res.status(500).json({ error: "Failed to fetch balance" });
      }

      const { totalIncome, totalExpenses } = results[0];
      res.json({ totalIncome, totalExpenses });
    }
  );
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

const deleteIncome = (req, res) => {
  const { incomeId } = req.body;
  const userId = req.user.userId;

  if (!incomeId) {
    return res.status(400).json({ error: "incomeId is required" });
  }

  db.query("SELECT * FROM incomes WHERE id = ?", [incomeId], (err, results) => {
    if (err) {
      console.error("Error fetching income:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Income not found" });
    }

    const income = results[0];
    if (income.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this income" });
    }

    db.query("DELETE FROM incomes WHERE id = ?", [incomeId], (err) => {
      if (err) {
        console.error("Error deleting income:", err);
        return res.status(500).json({ error: "Failed to delete income" });
      }

      res.status(200).json({ message: "Income deleted successfully" });
    });
  });
};

module.exports = {
  createIncome,
  getAllIncomes,
  editIncome,
  getBalance,
  getIncomesByUser,
  deleteIncome,
};
