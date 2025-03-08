const Cart = require("../models/Cart");
const Product = require("../models/Product"); // Import Product model

exports.create = async (req, res) => {
    try {
        let { product, user, quantity } = req.body;

        // Check if the product ID is a valid ObjectId or a slug
        if (typeof product === "string" && !product.match(/^[0-9a-fA-F]{24}$/)) {
            const productData = await Product.findOne({ slug: product });
            if (!productData) {
                return res.status(404).json({ message: "Product not found" });
            }
            product = productData._id;
        }

        // Check if the product is already in the cart for the given user
        let existingCartItem = await Cart.findOne({ product, user });

        if (existingCartItem) {
            // If product exists, update the quantity
            existingCartItem.quantity += quantity; // Increase quantity
            await existingCartItem.save();
            console.log("1")
        } else {
            // Otherwise, create a new cart item
            console.log("2")
            existingCartItem = new Cart({ product, user, quantity });
            await existingCartItem.save();
        }

        // Populate the product details and return the response
        const populatedCart = await existingCartItem.populate({ path: "product", populate: { path: "brand" } });

        res.status(201).json(populatedCart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding product to cart, please try again later" });
    }
};


// ✅ Get Cart Items by User ID
exports.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Cart.find({ user: id }).populate({ path: "product", populate: { path: "brand" } });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching cart items, please try again later" });
    }
};

// ✅ Update Cart Item by ID
exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Cart.findByIdAndUpdate(id, req.body, { new: true }).populate({ path: "product", populate: { path: "brand" } });

        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating cart item, please try again later" });
    }
};

// ✅ Delete Cart Item by ID
exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Cart.findByIdAndDelete(id);

        res.status(200).json(deleted);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting cart item, please try again later" });
    }
};

// ✅ Delete All Cart Items for a User
exports.deleteByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.deleteMany({ user: id });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some error occurred while resetting your cart" });
    }
};
