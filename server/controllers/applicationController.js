const db = require("../db");

const applyCompany = (req, res) => {

  const { student_id, company_id } = req.body;

  const sql =
    "INSERT INTO applications(student_id, company_id) VALUES (?, ?)";

  db.query(
    sql,
    [student_id, company_id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Applied Successfully"
      });

    }
  );
};

const getMyApplications = (req, res) => {

  const sql = `
    SELECT
      applications.id,
      companies.company_name,
      companies.role,
      companies.package
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