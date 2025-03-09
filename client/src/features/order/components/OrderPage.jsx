import React, { useEffect, useState } from "react";
import { useParams ,Link} from "react-router-dom";
import { getOrderById,handleReturnProduct, PayOrderById ,sendPaymentConfirmation,CancelOrder,verifyPaymentOrder,createPaymentOrder} from "../OrderApi";
import CancelOrderButton from "./orderOverlay"
import { motion, useScroll, useSpring, useTransform, useMotionValue, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { SHIPPING } from '../../../constants'
import { toast } from "react-toastify";
import ReturnProductButton from './orderReturn';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
  Box,
  Button,
  useTheme,
  CardContent,
  Card,
  Stack,
  Chip
} from "@mui/material";
import {
  LocalShipping, CheckCircle, LocationOn, Done, AccessTime,
  Payment,
  Home,
  Inventory,
  Cancel,
  Store,
  DirectionsBike ,
  CreditCard,
} from "@mui/icons-material";

  // ... [keep all the existing state and effects same] ...
  const MotionBox = motion(Box);

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  let canCancelAfterPay;
  const [priceDetails, setPriceDetails] = useState({
    subtotal: 0,
    totalDiscount: 0,
    shipping: 0,
    total: 0
});
console.log(order)
const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const statusIcons = {
    Ordered: <Inventory style={{ color: "#1976D2" }} />, // Blue
    Packed: <Store style={{ color: "#FF9800" ,paddingBottom:"2px"}} />, // Orange
    Shipped: <LocalShipping style={{ color: "#4CAF50" }} />, // Green
    "Out for Delivery": <DirectionsBike style={{ color: "#0288D1" }} />, // Blue
    Delivered: <CheckCircle style={{ color: "#2E7D32" }} />, // Dark Green
    cancelled :<Cancel style={{ color:"red" }} />
  };
  
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await getOrderById(id);
      setOrder(response[0]);
      canCancelAfterPay =
  order?.isPaid &&
  order?.paidAt &&
  Date.now() - new Date(order.paidAt).getTime() < cancellationWindow;
      
    } catch (err) {
      setError("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);
  useEffect(() => {
    if (order) {
        console.log("Order data:", order); // Debugging line
        calculatePrices(order);
    } else {
        console.error("Order data is invalid:", order);
    }
}, [order]);



  const sendPaymentConformationEmail = async () => {
    const emailData = {
      userEmail: order.user.email,
       userName: order.user.name,
      orderId: order.orderId,
      total: order.totalPrice,
     paymentMode:order.paymentMode
    };

    try {
      await sendPaymentConfirmation(emailData);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "success";
      case "processing":
        return "info";
      case "cancelled":
        return "error";
        case "on hold":
        return "warning";
      default:
        return "warning";
    }
  };
  const currentStatus =
  order?.statusUpdates && order.statusUpdates.length > 0
    ? order.statusUpdates[order.statusUpdates.length - 1].status
    : "On Hold";

  const PaidOrderHandler = async () => {
    try {
        const response = await PayOrderById(id);
                   await fetchOrderDetails();
      sendPaymentConformationEmail();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
  const CancelOrderHandler = async () => {
    try {
        const response = await CancelOrder(id);
                   await fetchOrderDetails();
      
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const handlePayment = async () => {
    try {
      const orderData=
      {
          amount: order.total,
          currency: "INR",
        }
      const response= await createPaymentOrder(orderData);
      
        const data = response
      

      const options = {
        key: "rzp_test_kFwy7UWJBQV0L3",
        amount: data.amount,
        currency: data.currency,
        name: "Regalmints",
        description: `Order Payment - ${order._id}`,
        order_id: data.id,
        handler: async (response) => {
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.orderId,
            email: order.user.email,
          };

          try {
            const verifyResponse = await verifyPaymentOrder(paymentData);
            
            if (verifyResponse.success) {
              toast.success("Payment Successful!");
              await PaidOrderHandler();
            } 
          } catch (error) {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: order.user.name,
          email: order.user.email,
          contact: order.address[0].phoneNumber,
        },
        theme: { color: theme.palette.primary.main },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment Failed! Please try again.");
      console.error("Payment Error:", error);
    }
  };
  const calculatePrices = (order) => {
    if (!order || !order.item) {
        console.error("Invalid order data:", order);
        return;
    }

    let subtotal = 0;
    let totalDiscount = 0;

    order.item.forEach((item) => {
        const itemPrice = item.product.price * item.quantity;
        console.log(itemPrice)
        subtotal += itemPrice;
        totalDiscount += itemPrice * (item.product.discountPercentage / 100);
    });

    let total = subtotal - totalDiscount;

    setPriceDetails({
        subtotal: subtotal,
        totalDiscount: totalDiscount,
        shipping: 0,
        total: total,
    });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const progressVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1 },
};

useEffect(() => {
  if (order?.statusUpdates) {
    setCurrentStepIndex(order.statusUpdates.length);
  }
}, [order]);

useEffect(() => {
  if (inView) {
    controls.start("visible");
  }
}, [controls, inView]);

  // Define cancellation window duration (e.g., 1 hour)
const cancellationWindow = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

 

 
  console.log(canCancelAfterPay)

  if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!order) return <Alert severity="warning">Order not found.</Alert>;



  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ p: 3, bgcolor: "background.default", borderRadius: 2 }}>
        {/* Order Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="700" gutterBottom>
            Order #{order.orderNumber}
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: 'wrap' }}>
            <Chip
              label={currentStatus}
              color={getStatusColor(currentStatus)}
              sx={{ fontWeight: 600, fontSize: "1rem" }}
            />
            {!order.isCanceled && !order.isDelivered && canCancelAfterPay &&
            <CancelOrderButton id={id} CancelOrder={CancelOrderHandler} fetchOrderDetails={fetchOrderDetails} />
}
            {order.paymentMode === "COD" && !order.isPaid && order.isCanceled && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CreditCard />}
                onClick={handlePayment}
                sx={{ borderRadius: 2, px: 4 }}
              >
                Pay Now
              </Button>
            )}
          </Box>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Shipping & Payment Info */}
          <Grid item xs={12} md={5}>
         
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                <Home sx={{ mr: 1, verticalAlign: "middle" }} />
                Shipping Address
              </Typography>
              <Typography variant="body1">
                {order.address[0].street}
                <br />
                {order.address[0].city}, {order.address[0].state}
                <br />
                {order.address[0].postalCode}
                <br />
                Phone: {order.address[0].phoneNumber}
              </Typography>
            </Box>

            
            <Divider/>
            {!order.isCanceled && 
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                <Payment sx={{ mr: 1, verticalAlign: "middle" }} />
                Payment Information
              </Typography>
              <Typography variant="body1" paragraph>
                Method: {order.paymentMode}
                <br />
                {order.isPaid ? (
                  <Alert severity="success" sx={{ mt: 1 }}>
                    Paid on {new Date(order.paidAt).toLocaleString("en-GB")}
                  </Alert>
                ) : (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Payment Pending
                  </Alert>
                )}
              </Typography>
            </Box>}
           

            {/* Delivery Information */}
            {(order.isPaid  || order.isCanceled) && (
              <Box sx={{ mt: 4 }}>
                {(order.isPaid || !order.isCanceled )&& 
                <>
                <Typography variant="h5" fontWeight="600" gutterBottom>
                  <LocalShipping sx={{ mr: 1, verticalAlign: "middle" }} />
                  Delivery Information
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
  Expected delivery by{" "}
  {new Date(order.expectedDelivery || Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toLocaleDateString("en-GB")}
</Alert> </>}
<Box sx={{ mt: 4 }}>

                </Box>
                <Typography variant="h5" fontWeight="600" gutterBottom>
                <LocationOn sx={{ mr: 1, verticalAlign: "middle" }} />
                Order Tracking
              </Typography>             
                {(order.isPaid || order.isCanceled) && (
  <Card sx={{ mt: 3, p: 2 ,border:"none"}}>
    
      {/* Inside your component's return statement */}
      <Box ref={ref} sx={{ position: 'relative', pl: 4, my: 4 ,border:'none',boxshadow:'none'}}>
  {/* Vertical line */}
  <MotionBox
    sx={{
      position: 'absolute',
      left: 20,
      top: 8,
      bottom: 8,
      width: 2,
      bgcolor: 'gray',
      zIndex: 1
    }}
    variants={progressVariants}
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    transition={{ duration: 1.5, ease: "easeInOut" }}
  />

  {/* Progress line */}
  <MotionBox
    sx={{
      position: 'absolute',
      left: 20,
      top: 8,
      width: 2,
      bgcolor: 'lightgreen',
      zIndex: 2,
      transformOrigin: "top"
    }}
    variants={progressVariants}
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    transition={{ duration: 1.2, ease: "circOut" }}
    style={{
      height: order?.statusUpdates?.length 
        ? `${((currentStepIndex + 1) * 100) / (order.statusUpdates.length + 1)}%`
        : '0%'
    }}
  />

  <MotionBox
    variants={containerVariants}
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    sx={{ position: 'relative' ,zIndex:"5"}}
  >
    {[
      { 
        status: 'Order Confirmed', 
        timestamp: order.createdAt, 
        location: 'REGALMINTS',
        isInitial: true
      },
      ...(order.statusUpdates || [])
    ].map((step, index, arr) => {
      const isCompleted = index <= currentStepIndex;
      const isCurrent = index === currentStepIndex;
      const isLast = index === arr.length - 1;

      return (
        <MotionBox
          key={index}
          variants={itemVariants}
          transition={{ duration: 0.5 }}
          sx={{ 
            position: 'relative',
            mb: 4,
            pl: 4,
            '&::before': {
              content: '""',
              position: 'absolute',
              left: -19,
              top: 4,
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: `2px solid ${isCompleted ? 'primary.main' : 'divider'}`,
              bgcolor: isCurrent ? 'green' : 'lightgreen',
              zIndex: 3
            }
          }}
        >
          <Box sx={{
            pb: 2,
            borderBottom: !isLast ? '1px solid' : 'none',
            borderColor: 'divider'
          }}>
            <Typography variant="subtitle2" fontWeight={600} 
              color={isCompleted ? 'text.primary' : 'text.secondary'}>
              {step.status}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
  {new Date(step.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })}
</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <LocationOn sx={{ fontSize: 14, color: 'action.active', mr: 0.5 }} />
                <Typography variant="caption" color="text.secondary">
                  {step.location}
                </Typography>
              </Box>
            </Box>

            {isCurrent && (
              <MotionBox
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bgcolor: 'primary.light',
                  color: 'primary.dark',
                  px: 1,
                  borderRadius: 1,
                  fontSize: 12,
                  fontWeight: 500
                }}
              >
                Current
              </MotionBox>
            )}
          </Box>
        </MotionBox>
      );
    })}
  </MotionBox>
</Box>

   
  </Card>
)}
<ReturnProductButton 
mt={10}
ml={10}
  id={id} 
  order={order} 
  ReturnProduct={handleReturnProduct} 
  fetchOrderDetails={fetchOrderDetails}
/>

              </Box>
             
              
                
             
              
            )}
           
          </Grid>

          {/* Order Items */}
          <Grid item xs={12} md={7}>
            <Box sx={{ 
              height: { xs: 'auto'},
              overflowY: 'none',
              pr: { md: 2 },
              borderRight: { md: `1px solid ${theme.palette.divider}` }
            }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                <Inventory sx={{ mr: 1, verticalAlign: "middle" }} />
                Order Items ({order.item.length})
              </Typography>

              {order.item.map((orderItem, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: "flex", 
                    gap: 2, 
                    alignItems: "center",
                    flexWrap: 'wrap'
                  }}>
                    <Avatar
                      src={orderItem.product.thumbnail}
                      variant="square"
                      component={Link}
                      to={`/product-details/${orderItem.product.slug}`}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        borderRadius: 2,
                        flexShrink: 0
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 200 }}>
                      <Typography variant="h6" fontWeight="600" sx={{textDecoration:"none",color:'black'}} component={Link}
                      to={`/product-details/${orderItem.product.slug}`}>
                        {orderItem.product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {orderItem.product.brand.name}
                      </Typography>
                      <Box sx={{ 
                        display: "flex", 
                        gap: 2, 
                        mt: 1,
                        flexWrap: 'wrap'
                      }}>
                        <Chip 
                          label={`Qty: ${orderItem.quantity}`} 
                          size="small" 
                        />
                        <Typography variant="body1" fontWeight="600">
                          ₹{(orderItem.product.price * orderItem.quantity).toFixed(2)}
                        </Typography>
                        {orderItem.product.discountPercentage > 0 && (
                          <Chip
                            label={`${orderItem.product.discountPercentage}% OFF`}
                            color="success"
                            size="small"
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Box>
            <Box sx={{ 
        mt: 4,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        position: 'relative'
      }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Price Details
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Subtotal ({order.item.length} items):</Typography>
            <Typography variant="body1">₹{priceDetails.subtotal}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Delivery Charges:</Typography>
            <Typography variant="body1">
              {SHIPPING > 0 ? 
                `₹${SHIPPING}` : 
                'FREE'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="success.main">
              Discount ({order.item.reduce((acc, item) => acc + (item.product.discountPercentage > 0 ? 1 : 0), 0)} items):
            </Typography>
            <Typography variant="body1" color="success.main">
              -₹{priceDetails.totalDiscount}
            </Typography>
            
          </Box>
          <Box sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body2" color="success.main" sx={{ }}>
            You saved ₹{priceDetails.totalDiscount} on this order
          </Typography>
          </Box>
          
          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="700">Total Amount:</Typography>
            <Typography variant="h6" fontWeight="700">
              ₹{order.total}
            </Typography>
          </Box>

          
        </Box>
        </Box>

            {/* Payment Summary */}
            <Box sx={{ 
              mt: 4, 
              textAlign: "right",
              position: 'sticky',
              bottom: 0,
              left:0,
              bgcolor: 'background.default',
              py: 2,
              borderTop: `1px solid ${theme.palette.divider}`
            }}>

              <Typography variant="h5" gutterBottom>
                Total: ₹{order.total.toFixed(2)}
              </Typography>
              {(order.paymentMode === "COD" || order.paymentMode === "ONLINE") && !order.isPaid && !order.isCanceled  && (
                <>
                

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CreditCard />}
                  onClick={handlePayment}
                  sx={{ borderRadius: 2, px: 4, mt: 2 }}
                >
                  Complete Payment
                </Button>
                </>
              )}
              {order.paymentMode === "COD" && !order.isPaid && !order.isCanceled && (
                <>
                

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Pay now to confirm your order
                </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderDetailsPage;
