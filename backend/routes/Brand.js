const express = require("express");
const brandController = require("../controllers/Brand");

const router = express.Router();

router.post("/", brandController.createBrand);
router.get("/", brandController.getBrands);
router.get("/:id", brandController.getBrandById);
router.put("/:id", brandController.updateBrand);
router.delete("/:id", brandController.deleteBrand);

module.exports = router;
