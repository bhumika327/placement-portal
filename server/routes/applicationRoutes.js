const express = require("express");
const router = express.Router();

const {
  applyCompany,
  getMyApplications,
    getAllApplications,
  updateApplicationStatus,
   updateStatus
} = require("../controllers/applicationController");

router.post("/apply", applyCompany);

router.get("/my-applications", getMyApplications);
router.get("/admin", getAllApplications);
router.put("/status/:id", updateStatus);

router.put(
  "/status/:id",
  updateApplicationStatus
);

module.exports = router;
