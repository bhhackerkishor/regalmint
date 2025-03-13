require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");
const contactRoutes = require("./routes/contact");
const paymentRoutes = require("./routes/paymentRoutes");
const AdminApiRoutes = require("./routes/AdminApiRoutes");
const { connectToDB } = require("./database/db");

// Server init
const server = express();

// Database connection
connectToDB();

// Middlewares
server.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// Corrected `options` method
server.options("*");

// ✅ Health check route for UptimeRobot
server.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is alive!" });
});

// Route Middleware
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);
server.use("/contact", contactRoutes);
server.use("/admin", AdminApiRoutes);
server.use("/payment", paymentRoutes);

// Root route
server.get("/", (req, res) => {
  res.status(200).json({ message: "running" });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server [STARTED] ~ http://localhost:${PORT}`);
});
