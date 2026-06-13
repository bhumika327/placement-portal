const db = require("../db");

const registerStudent = (req, res) => {

  const { name, email, password, branch, cgpa } = req.body;

  const sql =
    "INSERT INTO students(name,email,password,branch,cgpa) VALUES (?,?,?,?,?)";

  db.query(
    sql,
    [name, email, password, branch, cgpa],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Student Registered Successfully"
      });

    }
  );
};

module.exports = { registerStudent };