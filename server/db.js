const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "thirteen102004",
  database: "placement_portal"
});

db.connect((err) => {
  if (err) {
    console.log("Connection Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
