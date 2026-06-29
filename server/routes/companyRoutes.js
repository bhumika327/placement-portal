const express = require("express");
const router = express.Router();


const {
  getCompanies,
  addCompany,
  deleteCompany
} = require("../controllers/companyController");
router.get("/", getCompanies);
router.delete("/:id", deleteCompany);

router.post("/", addCompany);

module.exports = router;