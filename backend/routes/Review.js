const express = require("express");
const reviewController = require("../controllers/Review");

const router = express.Router();

router
    .post("/", reviewController.create)  // Create review
    .get("/product/:slug", reviewController.getByProductSlug)  // Get reviews by product slug
    .patch("/:id", reviewController.updateById)  // Update review by ID
    .delete("/:id", reviewController.deleteById);  // Delete review by ID

module.exports = router;
