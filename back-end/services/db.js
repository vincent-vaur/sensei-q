const mysql = require("mysql2/promise");

// Connexion à la BDD
const db = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;
