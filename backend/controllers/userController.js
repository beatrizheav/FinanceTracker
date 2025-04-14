const db = require("../config/db");

const getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Database query error: ", err);
      return res
        .status(500)
        .json({ error: "Error retrieving users from database" });
    }
    res.json(results);
  });
};

module.exports = { getAllUsers };
