const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
            { expiresIn: "365d" } // Expiration time (e.g., 1 hour)
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

const loginUser = (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res
      .status(400)
      .json({message: "Email and password are required"});
  }

  db.execute("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if(err){
      console.error(err);
      return res.status(500).json({message: "Interval server error"});
    }

    if (results.length === 0) {
      return res.status(404).json({message: "User not found"});
    };



    const user = results[0]
    bcrypt.compare(password, user.password)
    .then((passwordMatch) => {

      if(passwordMatch){
        const token = jwt.sign(
          { userId: results[0].id, email }, // Payload: userId and email
          process.env.JWT_SECRET_KEY, // environment variable for the secret key
          { expiresIn: "365d" } // Expiration time (e.g., 1 hour)
        );
        res.status(200).json({
          message: "Login successfully",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          }
        })
      }else{
        return res.status(400).json({message: "Invalid email or password"})
      }
    })
    .catch((compareErr) => {
        console.error(compareErr);
        return res.status(500).json({ message: "Error validating password" });
    })
  })
}

module.exports = { getAllUsers, createUser, loginUser };
