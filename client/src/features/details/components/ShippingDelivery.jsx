import React from "react";
import { Typography } from "@mui/material";
import PolicyLayout from "./PolicyLayout";

const ShippingDelivery = () => {
  return (
    <PolicyLayout title="Shipping & Delivery">
      <Typography variant="h6" gutterBottom>1. Shipping Time</Typography>
      <Typography paragraph>Orders are processed within 2-3 business days.</Typography>

      <Typography variant="h6" gutterBottom>2. Shipping Costs</Typography>
      <Typography paragraph>Shipping charges depend on the location and order value.</Typography>

      <Typography variant="h6" gutterBottom>3. International Shipping</Typography>
      <Typography paragraph>We offer international shipping with applicable customs duties.</Typography>
    </PolicyLayout>
  );
};

export default ShippingDelivery;
