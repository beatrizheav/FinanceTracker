const db = require("../config/db"); // your MySQL connection

const getUserCategories = (req, res) => {
  const userId = req.user.userId; // Extract userId from the JWT payload

  // const query = "SELECT * FROM categories WHERE user_id = ?";
  const query = `
  SELECT 
    c.id, c.name, c.budget, c.color, c.icon,
    COALESCE(SUM(e.amount), 0) AS expense
  FROM categories c
  LEFT JOIN expenses e ON c.id = e.category_id
  WHERE c.user_id = ?
  GROUP BY c.id
 `;

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
  const { name, budget, expense = 0, color, icon } = req.body;

  if (!name || !budget || !color || !icon) {
    return res
      .status(400)
      .json({ message: "Missing required category fields." });
  }

  const query = `INSERT INTO categories (user_id, name, budget, expense, color, icon)
                  VALUES (?,?,?,?,?,?)`;

  const values = [userId, name, budget, expense, color, JSON.stringify(icon)];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error adding category:", err);
      return res.status(500).json({ message: "Failed to add category." });
    }

    res
      .status(200)
      .json({ message: "Category created successfully.", results });
  });
};

const editCategory = (req, res) => {
  const userId = req.user.userId; // From JWT
  const { name, budget, color, icon, id } = req.body;

  if (!name || !budget || !color || !icon) {
    return res
      .status(400)
      .json({ message: "Missing required fields to update category." });
  }

  const query = `
    UPDATE categories 
    SET name = ?, budget = ?, color = ?, icon = ?
    WHERE id = ? AND user_id = ?
  `;

  const values = [name, budget, color, JSON.stringify(icon), id, userId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error updating category:", err);
      return res.status(500).json({ message: "Failed to update category." });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Category not found or not owned by user." });
    }

    res.status(200).json({ message: "Category updated successfully." });
  });
};

module.exports = { getUserCategories, createCategory, editCategory };
