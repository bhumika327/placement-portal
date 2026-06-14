const express = require("express");

const router = express.Router();

const {
  registerStudent,
  loginStudent
} = require("../controllers/studentController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/register", registerStudent);

router.post("/login", loginStudent);

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