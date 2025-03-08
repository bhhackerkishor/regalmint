const mongoose = require("mongoose");
const { Schema } = mongoose;

// Order Schema
const orderSchema = new Schema({
    orderNumber: {
        type: Number,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    item: {
        type: [Schema.Types.Mixed],
        required: true
    },
    address: {
        type: [Schema.Types.Mixed],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Dispatched', 'Out for delivery', 'Cancelled'],
        default: 'Pending'
    },
    statusUpdates: [
        {
          status: String,
          location: String,
          timestamp: { type: Date, default: Date.now },
        },
      ],

    paymentMode: {
        type: String,
        enum: ['COD', 'UPI', 'ONLINE'],
        required: true
    },
    paymentResult: { 
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
        transactionId: { type: String },
      },
      isPaid: { type: Boolean, required: true, default: false },
      paidAt: { type: Date },
    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDelivered: { type: Boolean, required: true, default: false },
    isReturned: { type: Boolean, required: true, default: false },
    ExpectedDeliveryDate: {
        type: Date,
        
    },
    deliveredAt: { type: Date },
    isCanceled:{type:Boolean ,default:false},
}, { versionKey: false });

// Function to generate a random 4-digit number
async function generateUniqueOrderNumber() {
    let orderNumber;
    let isUnique = false;

    while (!isUnique) {
        orderNumber = Math.floor(1000 + Math.random() * 9000); // Random number between 1000-9999
        const existingOrder = await mongoose.model("Order").findOne({ orderNumber });
        if (!existingOrder) {
            isUnique = true;
        }
    }
    return orderNumber;
}

// Middleware to set a random unique order number before saving
orderSchema.pre("save", async function (next) {
    if (!this.orderNumber) {
        this.orderNumber = await generateUniqueOrderNumber();
    }
    next();
});

module.exports = mongoose.model("Order", orderSchema);
