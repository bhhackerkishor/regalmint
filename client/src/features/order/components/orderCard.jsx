import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";

const OrderDetailsCard = ({ order }) => {
  return (
    <Card sx={{ maxWidth: 800, mx: "auto", my: 2, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order #{order.orderNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {order.status} | Payment: {order.paymentMode}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Shipping Address
        </Typography>
        <Typography variant="body2">
          {order.address[0].street}, {order.address[0].city}, {order.address[0].state}, {order.address[0].country} - {order.address[0].postalCode}
        </Typography>
        <Typography variant="body2">Phone: {order.address[0].phoneNumber}</Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Ordered Items
        </Typography>
        {order.item.map((product, index) => (
          <Card key={index} sx={{ display: "flex", my: 2, p: 2, boxShadow: 1 }}>
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100, borderRadius: 1 }}
              image={product.product.thumbnail}
              alt={product.product.title}
            />
            <Box sx={{ flex: 1, ml: 2 }}>
              <Typography variant="subtitle1">{product.product.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.product.description.slice(0, 100)}...
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Price: ₹{product.product.price} | Quantity: {product.quantity}
              </Typography>
              <Typography variant="body2">Brand: {product.product.brand.name}</Typography>
            </Box>
          </Card>
        ))}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: ₹{order.total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderDetailsCard;
