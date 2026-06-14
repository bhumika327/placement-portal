const db = require("../db");
const jwt = require("jsonwebtoken");

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

const loginStudent = (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM students WHERE email=?";

  db.query(sql, [email], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Student Not Found"
      });
    }

    const student = result[0];

    if (student.password !== password) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: student.id,
        email: student.email
      },
      "placement_secret",
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login Successful",
      token
    });

  });

};

module.exports = {
  registerStudent,
  loginStudent
};