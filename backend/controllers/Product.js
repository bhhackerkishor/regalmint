const { Schema, default: mongoose } = require("mongoose");
const slugify = require("slugify");
const Product = require("../models/Product");

// Create a new product with a slug
exports.create = async (req, res) => {
    try {
        const { title } = req.body;

        // Generate a unique slug
        const slug = slugify(title, { lower: true, strict: true });

        const created = new Product({ ...req.body, slug });
        await created.save();

        res.status(201).json(created);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error adding product, please try again later" });
    }
};

// Get all products with optional filters
exports.getAll = async (req, res) => {
    try {
        const filter = {};
        const sort = {};
        let skip = 0;
        let limit = 0;

        if (req.query.brand) {
            filter.brand = { $in: req.query.brand };
        }

        if (req.query.category) {
            filter.category = { $in: req.query.category };
        }

        if (req.query.user) {
            filter["isDeleted"] = false;
        }

        if (req.query.sort) {
            sort[req.query.sort] = req.query.order ? (req.query.order === "asc" ? 1 : -1) : 1;
        }

        if (req.query.page && req.query.limit) {
            const pageSize = req.query.limit;
            const page = req.query.page;

            skip = pageSize * (page - 1);
            limit = pageSize;
        }

        const totalDocs = await Product.find(filter).sort(sort).populate("brand").countDocuments().exec();
        const results = await Product.find(filter).sort(sort).populate("brand").skip(skip).limit(limit).exec();

        res.set("X-Total-Count", totalDocs);
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching products, please try again later" });
    }
};

// Get product by slug instead of ObjectId
exports.getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(req.params);

        const result = await Product.findOne({ slug }).populate("brand").populate("category");
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting product details, please try again later" });
    }
};

// Update product by slug
exports.updateBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log("Request Body:", req.body);

        const updated = await Product.findOneAndUpdate(
            { _id:slug },
            req.body,
            { new: true, runValidators: true }
        );
        console.log()
        if(req.body.price !== updated.discountPrice && req.body.discountPercentage !== updated.discountPercentage ){
        updated.discountPrice = req.body.price - (req.body.price * req.body.discountPercentage) / 100;
        }
        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }
        await updated.save();
        res.status(200).json(updated);
    } catch (error) {
        console.error("Update Error:", error.message, error.stack);
        res.status(500).json({ message: "Error updating product, please try again later" });
    }
};

// Restore product by slug
exports.undeleteBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(req.params);

        const unDeleted = await Product.findOneAndUpdate({ slug }, { isDeleted: false }, { new: true }).populate("brand");
        if (!unDeleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(unDeleted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error restoring product, please try again later" });
    }
};

// Soft delete product by slug
exports.deleteBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(req.params);

        const deleted = await Product.findOneAndUpdate({ slug }, { isDeleted: true }, { new: true }).populate("brand");
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting product, please try again later" });
    }
};
