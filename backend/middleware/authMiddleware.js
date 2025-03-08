const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler.js");
const User = require("../models/User.js");

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decodedToken._id).select("-password");
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorised, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorised as admin");
  }
};

module.exports = { protect, admin };
