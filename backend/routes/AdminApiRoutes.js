const express = require("express");
const { getDashboardStats } = require("../controllers/adminController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Route for Admin Dashboard Stats
router.get("/dashboard-stats", protect, admin, getDashboardStats);

module.exports = router;
