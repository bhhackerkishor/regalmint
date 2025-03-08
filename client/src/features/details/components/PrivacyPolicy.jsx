import React from "react";
import { Typography } from "@mui/material";
import PolicyLayout from "./PolicyLayout";

const PrivacyPolicy = () => {
  return (
    <PolicyLayout title="Privacy Policy">
      <Typography variant="h6" gutterBottom>1. Information We Collect</Typography>
      <Typography paragraph>We collect personal information such as name, email, and payment details when you use our services.</Typography>

      <Typography variant="h6" gutterBottom>2. How We Use Your Information</Typography>
      <Typography paragraph>Your data is used for order processing, customer service, and improving our website.</Typography>

      <Typography variant="h6" gutterBottom>3. Data Security</Typography>
      <Typography paragraph>We implement strong security measures to protect your data.</Typography>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
