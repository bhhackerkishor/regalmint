const express = require("express");
const productController = require("../controllers/Product");

const router = express.Router();

router
    .post("/", productController.create)  // Create product
    .get("/", productController.getAll)  // Get all products
    .get("/:slug", productController.getBySlug)  // Get product by slug
    .put("/:slug", productController.updateBySlug)  // Update product by slug
    .patch("/undelete/:slug", productController.undeleteBySlug)  // Restore product by slug
    .delete("/:slug", productController.deleteBySlug);  // Soft delete product by slug

module.exports = router;
