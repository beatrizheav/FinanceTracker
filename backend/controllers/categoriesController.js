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

const deleteCategory = (req, res) => {
  // Get the userId from the JWT payload and the categoryId from the request body
  const userId = req.user.userId;
  const categoryId = req.body.categoryId;

  if (!categoryId) {
    return res.status(400).json({ message: "Category ID is required." });
  }

  // Paso 1: Buscar id de la categoría "Sin categoría"
  const findUncategorizedQuery = `SELECT id FROM categories WHERE name = 'Sin categoría' AND user_id = ?`;

  db.query(findUncategorizedQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error searching for 'Sin categoría':", err);
      return res.status(500).json({ message: "Database error." });
    }
    const uncategorizedId = results[0].id;
    reassignExpensesAndDelete(categoryId, uncategorizedId, userId, res);
  });
};

function reassignExpensesAndDelete(categoryId, newCategoryId, userId, res) {
  // Paso 2: Reasignar los gastos a la nueva categoría
  const updateExpensesQuery = `UPDATE expenses SET category_id = ? WHERE category_id = ?`;
  db.query(updateExpensesQuery, [newCategoryId, categoryId], (err) => {
    if (err) {
      console.error("Error updating expenses:", err);
      return res.status(500).json({ message: "Failed to reassign expenses." });
    }

    // Paso 3: Eliminar la categoría original
    const deleteCategoryQuery = `DELETE FROM categories WHERE id = ? AND user_id = ?`;
    db.query(deleteCategoryQuery, [categoryId, userId], (err, result) => {
      if (err) {
        console.error("Error deleting category:", err);
        return res.status(500).json({ message: "Failed to delete category." });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Category not found or unauthorized." });
      }

      res
        .status(200)
        .json({ message: "Category deleted and expenses reassigned." });
    });
  });
}

module.exports = {
  getUserCategories,
  createCategory,
  editCategory,
  deleteCategory,
};
