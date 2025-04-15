const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("✅ Conectado a la base de datos MySQL");
});

module.exports = connection;
