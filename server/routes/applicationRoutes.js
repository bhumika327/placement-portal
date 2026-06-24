const express = require("express");
const router = express.Router();

const {
  applyCompany,
  getMyApplications
} = require("../controllers/applicationController");

router.post("/apply", applyCompany);

router.get("/my-applications", getMyApplications);

module.exports = router;
