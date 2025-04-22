const db = require("../config/db"); // your MySQL connection

const getUserCategories = (req, res) => {
  const userId = req.user.userId; // Extract userId from the JWT payload

  const query = "SELECT * FROM categories WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ message: "Failed to fetch categories." });
    }

    res.status(200).json(results);
  });
};

const createCategory = (req, res) => {
  const userId = req.user.userId; // Extract userId from the JWT payload
  const {
    name,
    budget,
    expense,
    color,
    icon
  } = req.body;

  if (!name || !budget || !expense || !color || !icon) {
    return res.status(400).json({message: "Missing required category fields."});
  }

  

  const query = `INSERT INTO categories (user_id, name, budget, expense, color, icon)
                  VALUES (?,?,?,?,?,?)`;

  const values = [
    userId,
    name,
    budget,
    expense,
    color,
    JSON.stringify(icon)
  ];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error adding category:", err);
      return res.status(500).json({ message: "Failed to add category." });
    }

    res.status(200).json({ message: "Category created successfully.", results});
  });
};

module.exports = { getUserCategories, createCategory };
