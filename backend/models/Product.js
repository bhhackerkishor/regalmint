const mongoose = require("mongoose");
const slugify = require("slugify");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            required: true,
            set: function (value) {
                // Generate slug only if not manually provided
                return value ? value : slugify(this.title, { lower: true, strict: true });
            }
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discountPercentage: {
            type: Number,
            default: 0
        },
        discountPrice: {
            type: Number,
            default: 0
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        },
        stockQuantity: {
            type: Number,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        images: {
            type: [String],
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true, versionKey: false }
);

// Ensure Slug Uniqueness Before Saving
productSchema.pre("save", async function (next) {
    if (!this.isModified("slug")) return next(); // Skip if slug is already set

    let slug = this.slug;
    let count = 1;
    let existingProduct = await mongoose.model("Product").findOne({ slug });

    while (existingProduct) {
        slug = `${this.slug}-${count}`;
        existingProduct = await mongoose.model("Product").findOne({ slug });
        count++;
    }

    this.slug = slug;
    next();
});
// Calculate and store discount price before saving
productSchema.pre("save", function (next) {
    if (this.isModified("price") || this.isModified("discountPercentage")) {
        this.discountPrice = this.price - (this.price * this.discountPercentage) / 100;
    }
    next();
});


module.exports = mongoose.model("Product", productSchema);
