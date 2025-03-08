import React from "react";
import { Typography } from "@mui/material";
import PolicyLayout from "./PolicyLayout";

const CancellationRefund = () => {
  return (
    <PolicyLayout title="Cancellation & Refund Policy">
      <Typography variant="h6" gutterBottom>1. Order Cancellation</Typography>
      <Typography paragraph>Orders can be canceled within 24 hours of purchase.</Typography>

      <Typography variant="h6" gutterBottom>2. Refund Process</Typography>
      <Typography paragraph>Refunds will be processed within 7-10 business days after cancellation.</Typography>

      <Typography variant="h6" gutterBottom>3. Non-Refundable Items</Typography>
      <Typography paragraph>Some items, such as digital goods and perishable products, are not eligible for refunds.</Typography>
    </PolicyLayout>
  );
};

export default CancellationRefund;
