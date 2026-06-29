const db = require("../db");

// Apply to a company
const applyCompany = (req, res) => {

  const { student_id, company_id } = req.body;

  const checkSql =
    "SELECT * FROM applications WHERE student_id=? AND company_id=?";

  db.query(checkSql, [student_id, company_id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "Already Applied"
      });
    }

    const sql =
      "INSERT INTO applications(student_id, company_id) VALUES (?, ?)";

    db.query(sql, [student_id, company_id], (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Applied Successfully"
      });

    });

  });

};

// Get all applications
const getMyApplications = (req, res) => {

  const sql = `
  SELECT
applications.id,
companies.company_name,
companies.role,
companies.package,
applications.status
    FROM applications
    JOIN companies
    ON applications.company_id = companies.id
    WHERE applications.student_id = ?
  `;

  db.query(sql, [3], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

module.exports = {
  applyCompany,
  getMyApplications
};