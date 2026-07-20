const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
   getApplicationsByCompany,
    getApplicationStatus
} = require("../controllers/adminController");

router.get("/stats", getDashboardStats);
router.get("/applications-company",   getApplicationsByCompany);
router.get("/status-chart", getApplicationStatus);
module.exports = router;