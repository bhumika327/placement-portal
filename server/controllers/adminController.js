const db = require("../db");

const getDashboardStats = (req, res) => {

  const queries = {
    students: "SELECT COUNT(*) AS total FROM students",
    companies: "SELECT COUNT(*) AS total FROM companies",
    applications: "SELECT COUNT(*) AS total FROM applications",
    accepted: "SELECT COUNT(*) AS total FROM applications WHERE status='Accepted'",
    rejected: "SELECT COUNT(*) AS total FROM applications WHERE status='Rejected'"
  };

  const stats = {};

  db.query(queries.students, (err, studentResult) => {

    if (err) return res.status(500).json(err);

    stats.students = studentResult[0].total;

    db.query(queries.companies, (err, companyResult) => {

      if (err) return res.status(500).json(err);

      stats.companies = companyResult[0].total;

      db.query(queries.applications, (err, applicationResult) => {

        if (err) return res.status(500).json(err);

        stats.applications = applicationResult[0].total;

        db.query(queries.accepted, (err, acceptedResult) => {

          if (err) return res.status(500).json(err);

          stats.accepted = acceptedResult[0].total;

          db.query(queries.rejected, (err, rejectedResult) => {

            if (err) return res.status(500).json(err);

            stats.rejected = rejectedResult[0].total;

            res.json(stats);

          });

        });

      });

    });

  });

};
const getApplicationsByCompany = (req, res) => {

  const sql = `
    SELECT
      companies.company_name,
      COUNT(applications.id) AS total
    FROM companies
    LEFT JOIN applications
      ON companies.id = applications.company_id
    GROUP BY companies.id
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};
const getApplicationStatus = (req, res) => {

  const sql = `
    SELECT
      status,
      COUNT(*) AS total
    FROM applications
    GROUP BY status
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

module.exports = {
  getDashboardStats,
getApplicationsByCompany,
getApplicationStatus
};