import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Button, Select, MenuItem, TextField, Typography, Box, Card, CardContent, 
  List, ListItem, ListItemIcon, ListItemText, Badge 
} from "@mui/material";
import { Inventory, LocalShipping, LocalMall, CheckCircle, DirectionsBike, Store, LocationOn } from "@mui/icons-material";
import { getOrderById, updateOrderStatusAndLocation } from "../../order/OrderApi";
import { toast } from "react-toastify";

const AdminOrderUpdate = () => {
  const { id: orderId } = useParams();
  const [status, setStatus] = useState("");
  const [customStatus, setCustomStatus] = useState("");
  const [order, setOrder] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const statusIcons = {
    Ordered: <Inventory sx={{ color: "#1976D2" }} />,
    Packed: <Store sx={{ color: "#FF9800" }} />,
    Shipped: <LocalShipping sx={{ color: "#4CAF50" }} />,
    "Out for Delivery": <DirectionsBike sx={{ color: "#0288D1" }} />,
    Delivered: <CheckCircle sx={{ color: "#2E7D32" }} />,
  };

  const getOrder = async () => {
    try {
      const response = await getOrderById(orderId);
      setOrder(response[0]); // Adjust according to API response structure
      console.log("Order:", response[0]);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, [orderId]);

  const updateStatusAndLocation = async () => {
    try {
      // If custom is selected, use the customStatus value
      const finalStatus = status === "custom" ? customStatus : status;

      const updateData = {
        orderId, // Ensure correct order ID is sent
        status: finalStatus,
        location,
      };

      await updateOrderStatusAndLocation(updateData);
      toast.success("Status and Location Updated Successfully");
      getOrder(); // Refresh order data
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box ml={30} p={4}>
      <Typography variant="h4" fontWeight="bold">Update Order</Typography>
      <Card sx={{ mt: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h6">
            Order Number: <strong>#{order.orderNumber}</strong>
          </Typography>
          <Typography variant="h6">
            Total Price: <strong>₹{order.total}</strong>
          </Typography>

          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              // Clear customStatus if not using custom
              if (e.target.value !== "custom") setCustomStatus("");
            }}
            displayEmpty
            sx={{ mt: 2, width: "100%" }}
          >
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Packed">Packed</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>

          {/* Render custom status input only if "custom" is selected */}
          {status === "custom" && (
            <TextField
              label="Enter custom status"
              variant="outlined"
              fullWidth
              value={customStatus}
              onChange={(e) => setCustomStatus(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}

          <TextField
            label="Enter current location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button variant="contained" color="primary" onClick={updateStatusAndLocation} sx={{ mt: 2 }}>
            Update
          </Button>

          <Typography variant="h5" color="primary" mt={3}>
            Order Tracking
          </Typography>
          <List>
            {order.statusUpdates?.length === 0 ? (
              <ListItem>
                <ListItemText 
                  primary={<strong>Status: </strong>} 
                  secondary={<Badge color="secondary">On Hold</Badge>} 
                />
              </ListItem>
            ) : (
              order.statusUpdates?.map((step, index) => (
                <ListItem key={index}>
                  <ListItemIcon>{statusIcons[step.status] || <CheckCircle />}</ListItemIcon>
                  <ListItemText 
                    primary={step.status} 
                    secondary={new Date(step.timestamp).toLocaleString()} 
                  />
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography variant="body2">{step.location}</Typography>
                  <Badge color={step.status === "Delivered" ? "success" : "warning"}>
                    {step.status === "Delivered" ? "✔" : "⏳"}
                  </Badge>
                </ListItem>
              ))
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminOrderUpdate;
