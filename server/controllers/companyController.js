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

module.exports = {
  getCompanies
};