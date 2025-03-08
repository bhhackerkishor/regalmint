import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";

const PolicyLayout = ({ title, children }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "12px", backgroundColor: "#fafafa" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
          {title}
        </Typography>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Paper>
    </Container>
  );
};

export default PolicyLayout;
