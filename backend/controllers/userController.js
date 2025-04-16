const db = require("../config/db");
const bcrypt = require("bcrypt")

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
        res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
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

module.exports = { getAllUsers, loginUser };
