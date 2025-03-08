import React from "react";
import { Typography } from "@mui/material";
import PolicyLayout from "./PolicyLayout";

const TermsAndConditions = () => {
  return (
    <PolicyLayout title="Terms and Conditions">
      <Typography variant="h6" gutterBottom>1. Introduction</Typography>
      <Typography paragraph>Welcome to RegalMints! These terms and conditions outline the rules and regulations for using our website.</Typography>

      <Typography variant="h6" gutterBottom>2. Use of Our Services</Typography>
      <Typography paragraph>By accessing this website, we assume you accept these terms. Do not continue to use RegalMints if you do not agree.</Typography>

      <Typography variant="h6" gutterBottom>3. Changes to Terms</Typography>
      <Typography paragraph>We reserve the right to modify these terms at any time.</Typography>
    </PolicyLayout>
  );
};

export default TermsAndConditions;
