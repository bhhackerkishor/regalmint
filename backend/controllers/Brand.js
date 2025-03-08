const Brand = require("../models/Brand");

// Create a new brand
exports.createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Brand name is required" });
        }
        const brand = new Brand({ name });
        await brand.save();
        res.status(201).json(brand);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all brands
exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get a single brand by ID
exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update a brand
exports.updateBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const brand = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
