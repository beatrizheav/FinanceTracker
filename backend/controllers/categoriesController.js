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

module.exports = { getUserCategories };
