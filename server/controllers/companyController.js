const db = require("../db");

const getCompanies = (req, res) => {

  const sql = "SELECT * FROM companies";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });
};
const deleteCompany = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM companies WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Company Deleted Successfully"
    });

  });

};
const addCompany = (req, res) => {

  const {
    company_name,
    role,
    package,
   eligibility_cgpa
  } = req.body;

  const sql = `
    INSERT INTO companies
    (company_name, role, package, min_cgpa)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [company_name, role, package, eligibility_cgpa],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Company Added Successfully"
      });

    }
  );
};
module.exports = {
  getCompanies,
  addCompany,
  deleteCompany
};