const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");

const registerStudent = async (req, res) => {

  const { name, email, password, branch, cgpa } = req.body;

  try {

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO students(name,email,password,branch,cgpa) VALUES (?,?,?,?,?)";

    db.query(
      sql,
      [name, email, hashedPassword, branch, cgpa],
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Student Registered Successfully"
        });

      }
    );

  } catch (error) {

    res.status(500).json(error);

  }
};

  
const loginStudent = async (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM students WHERE email=?";

  db.query(sql, [email], async (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Student Not Found"
      });
    }

    const student = result[0];

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
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