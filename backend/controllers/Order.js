const Order = require("../models/Order");

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
    const { status, location } = req.body;
    console.log(req.body,req.params)
    
    const order = await Order.findOne({ orderNumber: req.params.id }).populate('user', 'name email');
   console.log(order)
     if (status === 'Delivered') {
       order.isDelivered = true;
       order.deliveredAt = Date.now();
     } 
     
   if (order) {
     order.statusUpdates.push({ status, location });
     
     await order.save();
     
     res.json({ message: "Order updated successfully", order });
   } else {
     res.status(404);
     throw new Error("Order not found");
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
  