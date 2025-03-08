const asyncHandler = require('../middleware/asyncHandler.js');
const Order = require("../models/Order.js");
const User = require("../models/User.js");

// Admin Dashboard Stats
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const paidOrders = await Order.countDocuments({ isPaid: true });
  const unpaidOrders = totalOrders - paidOrders;
  const shippedOrders = await Order.countDocuments({ isShipped: true });
  const deliveredOrders = await Order.countDocuments({ isDelivered: true });
  const pendingOrders = await Order.countDocuments({ isShipped: false });

  const totalRevenue = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  const totalUsers = await User.countDocuments();
  const adminUsers = await User.countDocuments({ isAdmin: true });
  const normalUsers = totalUsers - adminUsers;
  
  const dailySales = await Order.aggregate([
    {
      $match: {
        isPaid: true,
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalSales: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const weeklyTraffic = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        userCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  
  res.json({
    totalRevenue: totalRevenue[0]?.total || 0,
    totalOrders,
    paidOrders,
    unpaidOrders,
    pendingOrders,
    shippedOrders,
    deliveredOrders,
    dailySales,
    weeklyTraffic,
    totalUsers,
    adminUsers,
    normalUsers,
  });
 
});


module.exports = { getDashboardStats };
