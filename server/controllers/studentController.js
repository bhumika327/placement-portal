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
const getProfile = (req, res) => {

  const sql =
    "SELECT id,name,email,branch,year,cgpa,resume FROM students WHERE id=?";

  db.query(
    sql,
    [req.user.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );
};
const updateProfile = (req, res) => {

  const { name, branch, cgpa } = req.body;

  const sql =
    "UPDATE students SET name=?, branch=?, cgpa=? WHERE id=?";

  db.query(
    sql,
    [name, branch, cgpa, req.user.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Profile Updated Successfully"
      });

    }
  );
};
const uploadResume = (req, res) => {

  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  const resume = req.file.filename;

  const sql =
    "UPDATE students SET resume=? WHERE id=?";

  db.query(sql, [resume, id], (err) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Resume uploaded successfully"
    });

  });

};
const dashboardStats = async (req, res) => {
  try {

    const studentId = req.user.id;

    const [companies] = await db.query(
      "SELECT COUNT(*) AS total FROM companies"
    );

    const [applications] = await db.query(
      "SELECT COUNT(*) AS total FROM applications WHERE student_id=?",
      [studentId]
    );

    const [pending] = await db.query(
      "SELECT COUNT(*) AS total FROM applications WHERE student_id=? AND status='Pending'",
      [studentId]
    );

    const [selected] = await db.query(
      "SELECT COUNT(*) AS total FROM applications WHERE student_id=? AND status='Selected'",
      [studentId]
    );

    const [rejected] = await db.query(
      "SELECT COUNT(*) AS total FROM applications WHERE student_id=? AND status='Rejected'",
      [studentId]
    );

    res.json({
      totalCompanies: companies[0].total,
      totalApplications: applications[0].total,
      pending: pending[0].total,
      selected: selected[0].total,
      rejected: rejected[0].total
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
module.exports = {
  registerStudent,
  loginStudent,
  getProfile,
  updateProfile,
  uploadResume
};
