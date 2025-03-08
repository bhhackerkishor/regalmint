import React, { useState } from "react";
import { AdminProductsPage } from "../features/admin/components/AdminProductsPage";
import { AddProduct } from "../features/admin/components/AddProduct";
import AdminSidebar from "../features/admin/components/adminSidebar";
import { AppBar, Tabs, Tab, Toolbar, Typography, Box, Paper } from "@mui/material";

export const AdminProducts = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <AdminSidebar />

      {/* Navbar with Rounded Borders & Margin from Left */}
      <Box sx={{ ml: "260px", mt: 2, display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            width: "80%",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <AppBar position="static" color="default" elevation={0} sx={{ borderRadius: "20px" }}>
            <Toolbar sx={{ justifyContent: "center" }}>
              
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                centered
                sx={{
                  "& .MuiTabs-indicator": { backgroundColor: "#1976d2" },
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    mx: 1,
                    transition: "background 0.3s",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  },
                }}
              >
                <Tab label="Products List" />
                <Tab label="Add Product" />
              </Tabs>
            </Toolbar>
          </AppBar>
        </Paper>
      </Box>

      {/* Content Switcher */}
      <Box sx={{ ml: "260px", p: 3 }}>
        <Paper sx={{ p: 3, width: "90%", margin: "auto", mt: 3 }} elevation={3}>
          {activeTab === 0 ? <AdminProductsPage /> : <AddProduct />}
        </Paper>
      </Box>
    </>
  );
};
