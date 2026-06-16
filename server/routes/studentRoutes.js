const {
  registerStudent,
  loginStudent,
  getProfile,
  updateProfile
} = require("../controllers/studentController");
const express = require("express");

const router = express.Router();



 const verifyToken = require("../middleware/authMiddleware");

router.post("/register", registerStudent);

 router.post("/login", loginStudent);
router.get(
  "/profile",
  verifyToken,
  getProfile
);
router.put(
  "/profile",
  verifyToken,
  updateProfile
);
router.get(
  "/dashboard",
  verifyToken,
  (req, res) => {
    res.json({
      message: "Welcome Student",
      user: req.user
    });
  }
);

module.exports = router;