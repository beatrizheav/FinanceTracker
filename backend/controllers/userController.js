const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const createUser = (req, res) => {
  const { name, lastName, email, password, avatar } = req.body;

  // Check for missing fields
  if (!name || !lastName || !email || !password || !avatar) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  // Check if email already exists
  db.execute("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to hash password" });
      }

      // Insert the new user into the database with the hashed password
      db.execute(
        "INSERT INTO users (name, lastName, email, password, avatar) VALUES (?, ?, ?, ?, ?)",
        [name, lastName, email, hashedPassword, avatar],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create user" });
          }

          // Create a JWT for the new user
          const token = jwt.sign(
            { userId: results.insertId, email }, // Payload: userId and email
            process.env.JWT_SECRET_KEY, // environment variable for the secret key
            { expiresIn: "1h" } // Expiration time (e.g., 1 hour)
          );

          // Return the JWT in the response
          return res.status(201).json({
            message: "User created successfully",
            token,
            user: {
              id: results.insertId,
              name,
              lastName,
              email,
            },
          });
        }
      );
    });
  });
};

module.exports = { getAllUsers, createUser };
