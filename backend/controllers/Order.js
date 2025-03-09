const Order = require("../models/Order");
const { sendMail }  = require("../utils/Emails");

exports.create=async(req,res)=>{
  try {
      const created=new Order(req.body)
      await created.save()
      res.status(201).json(created)
  } catch (error) {
      console.log(error);
      return res.status(500).json({message:'Error creating an order, please trying again later'})
  }
}



exports.getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        const results=await Order.find({user:id})
        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching orders, please trying again later'})
    }
}

exports.getAll = async (req, res) => {
    try {
        let skip=0
        let limit=0

        if(req.query.page && req.query.limit){
            const pageSize=req.query.limit
            const page=req.query.page
            skip=pageSize*(page-1)
            limit=pageSize
        }

        const totalDocs=await Order.find({}).countDocuments().exec()
        const results=await Order.find({}).skip(skip).limit(limit).exec()

        res.header("X-Total-Count",totalDocs)
        res.status(200).json(results)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching orders, please try again later'})
    }
};

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Order.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating order, please try again later'})
    }
}

exports.orderById = async (req, res) => {

    try {
        const { id } = req.params;
        
        const orders = await Order.find({ orderNumber:id });
        console.log(orders)
        res.status(200).json(orders);
        
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching orders" });
    }
}
 exports.updateOrderToPaid = async (req, res) => {
   
    const order = await Order.findOne({ orderNumber: req.params.id }).populate('user', 'name email');
 
    if (order) {
       order.isPaid = true;
       order.paidAt = Date.now();
       
 
       const updatedOrder = await order.save();
       res.status(200).json(updatedOrder);
    }
 
    else {
       res.status(404);
       throw new Error('Order not found');
    }
 }

exports.updateOrderStatusAndLocation = async (req, res) => {
  try {
    const { status, location } = req.body;
    console.log(req.body, req.params);

    const order = await Order.findOne({ orderNumber: req.params.id }).populate("user", "name email");
    console.log(order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    order.statusUpdates.push({ status, location });
    await order.save();

    // Send email notification to the user
    const userEmail = order.user.email;
    const userName = order.user.name;
    const orderId = order.orderNumber;

    const subject = `Order Update - Order #${orderId}`;
    

    const body = `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add table styling for order items */
        .order-items { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .order-items th { background: #f8f9fa; text-align: left; padding: 12px; }
        .order-items td { padding: 12px; border-bottom: 1px solid #eee; }
        .highlight-box { background: #f8f9fa; padding: 20px; border-radius: 4px; margin: 25px 0; }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet">

</head>
<body style="background-color: #f7f7f7;">
    <table width="100%" cellspacing="0" cellpadding="0" align="center">
        <tr>
    <td align="center" style="padding: 20px 0; background-color: #2A2A2A;">
        <a href="https://regalmints.vercel.app">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/004/700/955/small/rm-letter-logo-concept-isolated-on-white-background-vector.jpg" 
                 alt="RegalMints" 
                 width="150" 
                 height="150" 
                 style="display: block; border-radius: 50%; object-fit: cover;">
        </a>
        <h1 style="font-family: 'Dancing Script', cursive; color: white; font-size: 32px; margin-top: 10px;">
            RegalMints
        </h1>
    </td>
</tr>

        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table width="100%" max-width="600" style="background: white; padding: 30px;">
                    <tr>
                        <td>
                            <h1 style="color: #2A2A2A;">Order Update for #${order.orderNumber}</h1>
                            <p>Hi ${order.user.name},</p>
                            
                            <div class="highlight-box">
                                <p><strong>Order Date:</strong> ${order.createdAt.toLocaleDateString()}</p>
                                <p><strong>Status:</strong> ${status}</p>
                                ${location ? `<p><strong>Current Location:</strong> ${location}</p>` : ''}
                            </div>
                            
                            <h3>Your Order Details:</h3>
                            <table class="order-items">
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                ${order.item.map(item => `
                                    <tr>
                                        <td>${item.product.title}</td>
                                        <td>${item.quantity}</td>
                                        <td>₹${item.product.price}</td>
                                    </tr>
                                `).join('')}
                            </table>
                            
                            <div style="margin-top: 25px; display: flex; justify-content: space-between;">
                                <div style="width: 48%;">
                                      <h4>Shipping Address:</h4>
                                      <p>
                                          ${order.address[0].street},<br>
                                          ${order.address[0].city}, ${order.address[0].state},<br>
                                          ${order.address[0].postalCode}, ${order.address[0].country}<br>
                                          📞 ${order.address[0].phoneNumber}
                                      </p>
                                  </div>

                                <div style="width: 48%;">
                                    <h4>Payment Information:</h4>
                                    <p>Method: ${order.paymentMode}</p>
                                    <p>Total: ₹${order.total}</p>
                                    ${order.paymentResult?.transactionId ? 
                                        `<p>Transaction ID: ${order.paymentResult.transactionId}</p>` : ''}
                                </div>
                            </div>
                            
                            ${order.ExpectedDeliveryDate ? `
                            <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 4px;">
                                <p>Estimated Delivery: ${order.ExpectedDeliveryDate.toLocaleDateString()}</p>
                            </div>
                            ` : ''}
                            
                            ${status === 'Delivered' ? `
                            <div style="text-align: center; margin: 30px 0;">
                                <h2>Enjoy Your Order! 🎉</h2>
                                <p>Your order was delivered on ${order.deliveredAt.toLocaleDateString()} at ${order.deliveredAt.toLocaleTimeString()}</p>
                            </div>
                            ` : ''}
                            
                            <div style="text-align: center; margin: 40px 0;">
    <!-- Track Your Order -->
    <a href="https://regalmints.vercel.app/order/${order.orderNumber}" 
       style="display: inline-block; padding: 12px 25px; font-size: 16px; color: #fff; 
              background-color: #ff6600; text-decoration: none; border-radius: 6px; 
              font-weight: bold; margin-bottom: 15px;">
        Track Your Order
    </a>

    <!-- Shop New Arrivals -->
    <div style="margin: 20px 0;">
        <p style="font-size: 16px; color: #333; margin-bottom: 10px;">Ready for your next treat?</p>
        <a href="https://regalmints.vercel.app" 
           style="background-color: #D4AF37; color: white; padding: 12px 25px; text-decoration: none; 
                  border-radius: 6px; display: inline-block; font-weight: bold;">
            Shop New Arrivals
        </a>
    </div>

    <!-- Contact Us -->
    <div style="margin-top: 25px;">
        <p style="font-size: 16px; color: #333; margin-bottom: 10px;">Need support? We're here to help!</p>
        <a href="https://regalmints.vercel.app/contact" 
           style="display: inline-block; padding: 12px 25px; font-size: 16px; color: #fff; 
                  background-color: rgb(56, 172, 240); text-decoration: none; border-radius: 6px; 
                  font-weight: bold;">
            Contact Us
        </a>
    </div>
</div>


                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 30px 20px; background-color: #2A2A2A; color: white;">
                <p>Follow Us</p>
                <div style="margin: 15px 0;">
                    <a href="https://facebook.com/regalmints"><img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" width="24"></a>
                    <a href="https://instagram.com/regalmints"><img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" width="24"></a>
                    <a href="https://twitter.com/regalmints"><img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" width="24"></a>
                </div>
                <p style="font-size: 12px;">
                    © ${new Date().getFullYear()} RegalMints · All rights reserved<br>
                    Main Road, Marudur, Ariyalur, TamilNadu.<br>
                    <a href="UNSUBSCRIBE_URL" style="color: #D4AF37; text-decoration: none;">Unsubscribe</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;
    
    // In your sendMail function
    await sendMail(userEmail, subject, body);

    res.json({ message: "Order updated successfully & email sent", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

 

 
exports.cancelOrder = async (req, res) => {
     
     const order = await Order.findOne({ orderNumber: req.params.id }).populate('user', 'name email');
 
     if (!order) {
         res.status(404);
         throw new Error("Order not found");
     }
 
     // Only allow cancellation if order is not delivered
     if (order.isDelivered) {
         res.status(400);
         throw new Error("Cannot cancel a delivered order");
     }
 
     // Update order status to canceled
     order.isCanceled = true;
     order.statusUpdates = {status:"Canceled", location:"order was cancelled" }; // Update status
 
     const updatedOrder = await order.save();
     res.json(updatedOrder);
 };
 exports.returnOrder = async (req, res) => {
    console.log(req.body,req.params)
    try {
      const order = await Order.findOne({ orderNumber: req.params.id }).populate('user', 'name email');
  
      if (!order) {
        res.status(404);
        throw new Error("Order not found");
      }
  
      // Only allow return if order is delivered
      if (!order.isDelivered) {
        res.status(400);
        throw new Error("Cannot return a non-delivered order");
      }
      if (order.isReturned) {
        res.status(400);
        throw new Error("Return has already been requested");
      }
  
      // Update order status to returned
      order.isReturned = true;
  
      // Ensure that statusUpdates is an array; then add a new status update.
      if (!Array.isArray(order.statusUpdates)) {
        order.statusUpdates = [];
      }
      order.statusUpdates.push({
        status: "Return Requested",
        location: "Return process initiated",
      });
  
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (error) {
      // Optionally log the error and pass it to your error handler middleware
      console.error(error);
      res.status(res.statusCode || 500).json({ message: error.message });
    }
  };
  exports.sendOrderConfirmation = async (req, res) => {
    try {
      const { userEmail, userName, orderId, total, paymentMode } = req.body;
  
      if (!userEmail || !userName || !orderId || !total || !paymentMode) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Email content
      const subject = "Order Confirmation - RegalMints";
      const body = `
        <h2>Thank you for your order, ${userName}!</h2>
        <p>Your order <b>#${orderId}</b> has been successfully placed.</p>
        <p><b>Total:</b> ₹${total}</p>
        <p><b>Payment Mode:</b> ${paymentMode}</p>
        <p>We will notify you once your order is shipped.</p>
        <br>
        <p>Best Regards,</p>
        <p><b>RegalMints Team</b></p>
      `;
  
      // Send email
      await sendMail(userEmail, subject, body);
  
      res.status(200).json({ message: "Order confirmation email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };
 
exports.sendPaymentConfirmation = async (req, res) => {
  try {
    const { userEmail, userName, orderId, total, paymentMode } = req.body;
console.log(req.body)
    if (!userEmail || !userName || !orderId || !total || !paymentMode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email content
    const subject = "Payment Confirmation - RegalMints";
    const body = `
      <h2>Payment Successful!</h2>
      <p>Dear ${userName},</p>
      <p>Your payment for Order <b>#${orderId}</b> has been received successfully.</p>
      <p><b>Total Paid:</b> ₹${total}</p>
      <p><b>Payment Mode:</b> ${paymentMode}</p>
      <p>We will notify you once your order is shipped.</p>
      <br>
      <p>Best Regards,</p>
      <p><b>RegalMints Team</b></p>
    `;

    await sendMail(userEmail, subject, body);

    res.status(200).json({ message: "Payment confirmation email sent successfully!" });
  } catch (error) {
    console.error("Error sending payment confirmation email:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Send Order Status Update Email
 */
exports.sendOrderStatusUpdate = async (req, res) => {
  try {
    const { status, location } = req.body;
    const order = await Order.findOne({ orderNumber: req.params.id }).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const userEmail = order.user.email;
    const userName = order.user.name;
    const orderId = order.orderNumber;

    // Email content
    const subject = `Order Update - Order #${orderId}`;
    const body = `
      <h2>Order Status Update</h2>
      <p>Dear ${userName},</p>
      <p>Your order <b>#${orderId}</b> has been updated.</p>
      <p><b>New Status:</b> ${status}</p>
      <p><b>Current Location:</b> ${location || "Not Available"}</p>
      ${status === "Delivered" ? `<p>Your order has been successfully delivered. We hope you enjoy your purchase!</p>` : ""}
      <br>
      <p>Thank you for shopping with RegalMints!</p>
      <br>
      <p>Best Regards,</p>
      <p><b>RegalMints Team</b></p>
    `;

    await sendMail(userEmail, subject, body);

    res.status(200).json({ message: "Order status update email sent successfully!" });
  } catch (error) {
    console.error("Error sending order status update email:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
