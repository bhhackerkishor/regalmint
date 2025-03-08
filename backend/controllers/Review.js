const Review = require("../models/Review");
const Product = require("../models/Product"); // Import Product model to fetch by slug

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const { product: productSlug, user, rating, comment } = req.body;

        // Find product by slug to get its _id
        const product = await Product.findOne({ slug: productSlug }).select("_id");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Create review with product's ObjectId
        const created = new Review({
            user,
            product: product._id, // Use ObjectId instead of slug
            rating,
            comment,
        });

        await created.save();
        await created.populate({ path: "user", select: "-password" });

        res.status(201).json(created);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error posting review, please try again later" });
    }
};
exports.getByProductSlug = async (req, res) => {
    try {
        const { slug } = req.params;
        let skip = 0;
        let limit = 0;

        // Find product by slug
        const product = await Product.findOne({ slug }).select("_id");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.query.page && req.query.limit) {
            const pageSize = req.query.limit;
            const page = req.query.page;
            skip = pageSize * (page - 1);
            limit = pageSize;
        }

        const totalDocs = await Review.find({ product: product._id }).countDocuments().exec();
        const result = await Review.find({ product: product._id }).skip(skip).limit(limit).populate("user").exec();

        res.set("X-total-Count", totalDocs);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting reviews for this product, please try again later" });
    }
};

exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Review.findByIdAndUpdate(id, req.body, { new: true }).populate("user");
        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating review, please try again later" });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Review.findByIdAndDelete(id);
        res.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting review, please try again later" });
    }
};
